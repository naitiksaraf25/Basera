import { checkStaticCollegeAllowlist, COLLEGE_ALLOWLIST } from "../constants/collegeDomains.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const GEMINI_MODELS = ["gemini-flash-latest", "gemini-3.8-flash"];

/**
 * Clean and extract domain from an email or domain string.
 * @param {string} input 
 * @returns {string}
 */
export function extractDomain(input) {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim().toLowerCase();
  if (trimmed.includes("@")) {
    return trimmed.split("@")[1].trim();
  }
  return trimmed;
}

/**
 * Ask Gemini API whether an email domain belongs to an accredited educational institution.
 * @param {string} domain 
 * @returns {Promise<{ isEducational: boolean, confidence: 'high'|'medium'|'low', institutionName?: string, reason?: string }>}
 */
export async function assessDomainWithGemini(domain) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[College AI Verifier] GEMINI_API_KEY is not configured.");
    return {
      isEducational: false,
      confidence: "low",
      reason: "AI verification service not configured.",
    };
  }

  const prompt = `You are an academic credential and trust verification specialist for Basera, an Indian student housing and roommate matching platform.
Your task is to determine whether the provided internet domain belongs to a real, legitimate, recognized or accredited educational institution (such as a university, college, institute of technology, school, or research academy in India or internationally).

Target Domain: "${domain}"

Evaluation Criteria:
1. Is this domain associated with a genuine higher-education or secondary education institution?
2. Note that many regional Indian colleges use .org, .in, .org.in, .edu, or their own names (e.g. ceconline.edu, vtu.ac.in, srmuniv.ac.in).
3. Public webmail services (e.g. gmail.com, yahoo.com, outlook.com, proton.me, tempmail.com) MUST be rejected with isEducational=false.
4. Commercial or non-educational companies (e.g. amazon.com, infosys.com, tcs.com) MUST be rejected with isEducational=false.

Respond ONLY with a JSON object in this exact schema (no markdown, no extra commentary):
{
  "isEducational": true or false,
  "confidence": "high", "medium", or "low",
  "institutionName": "Full official institution name if known, else null",
  "reason": "Brief one sentence explanation"
}`;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500); // 8.5s max

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 300,
            responseMimeType: "application/json",
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errBody = await response.text().catch(() => "");
        console.warn(`[College AI Verifier] Model ${model} returned ${response.status}:`, errBody);
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      // Extract JSON payload safely
      let parsed = null;
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          parsed = JSON.parse(rawText.trim());
        }
      } catch (parseErr) {
        console.warn(`[College AI Verifier] JSON parse error:`, parseErr.message, "Raw was:", rawText);
        continue;
      }

      return {
        isEducational: Boolean(parsed.isEducational),
        confidence: ["high", "medium", "low"].includes(parsed.confidence) ? parsed.confidence : "medium",
        institutionName: parsed.institutionName || null,
        reason: parsed.reason || "Evaluated by AI credential assessment.",
      };
    } catch (err) {
      console.warn(`[College AI Verifier] Error with model ${model}:`, err.message);
      continue;
    }
  }

  return {
    isEducational: false,
    confidence: "low",
    reason: "AI verification request timed out or was temporarily unavailable.",
  };
}

/**
 * Hybrid College Domain Verification Service
 * 1. Fast static check against comprehensive allowlist & academic TLD patterns
 * 2. Fallback to Gemini AI for unlisted domains
 * 3. Graceful degradation to 'pending manual review' if unsure or failed
 *
 * @param {string} emailOrDomain 
 * @returns {Promise<{
 *   isVerified: boolean,
 *   status: 'verified' | 'pending',
 *   method: 'static_allowlist' | 'academic_pattern' | 'ai_verified' | 'pending_admin_review',
 *   domain: string,
 *   institutionName?: string,
 *   reason?: string,
 *   confidence?: string
 * }>}
 */
export async function verifyCollegeDomain(emailOrDomain) {
  const domain = extractDomain(emailOrDomain);

  if (!domain || !domain.includes(".")) {
    return {
      isVerified: false,
      status: "pending",
      method: "pending_admin_review",
      domain,
      reason: "Invalid or malformed domain.",
    };
  }

  // Stage 1: Static Allowlist & Institutional Pattern Check
  const staticResult = checkStaticCollegeAllowlist(domain);
  if (staticResult.isAllowed) {
    const method = staticResult.matchType === "pattern" ? "academic_pattern" : "static_allowlist";
    return {
      isVerified: true,
      status: "verified",
      method,
      domain,
      institutionName: staticResult.matchedDomain || domain,
      reason: "Matched recognized educational institution directory.",
      confidence: "high",
    };
  }

  // Stage 2: Gemini AI Fallback for unlisted domains
  try {
    const aiResult = await assessDomainWithGemini(domain);

    // Only auto-verify if Gemini is confidently affirmative
    if (aiResult.isEducational && (aiResult.confidence === "high" || aiResult.confidence === "medium")) {
      return {
        isVerified: true,
        status: "verified",
        method: "ai_verified",
        domain,
        institutionName: aiResult.institutionName || domain,
        reason: aiResult.reason || "Accredited educational domain verified by Basera AI.",
        confidence: aiResult.confidence,
      };
    }

    // Unrecognized or non-educational -> set to pending review (do NOT hard-reject)
    return {
      isVerified: false,
      status: "pending",
      method: "pending_admin_review",
      domain,
      institutionName: aiResult.institutionName || null,
      reason: aiResult.reason || "Domain not automatically recognized. Queued for manual admin verification review.",
      confidence: aiResult.confidence || "low",
    };
  } catch (err) {
    // Stage 3: Graceful degradation on unexpected failure
    console.error("[College Verification Error]:", err);
    return {
      isVerified: false,
      status: "pending",
      method: "pending_admin_review",
      domain,
      reason: "Automated verification temporarily unavailable. Queued for admin review.",
      confidence: "low",
    };
  }
}

export { COLLEGE_ALLOWLIST };
