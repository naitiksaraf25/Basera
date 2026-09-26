/**
 * Server-Side AI Moderation Advisory Service (Google Gemini API)
 * STRICT SECURITY:
 * GEMINI_API_KEY is read server-side from environment variables only.
 * The key is NEVER leaked in any client payload or error response.
 */

const GEMINI_MODELS = ["gemini-3.8-flash", "gemini-flash-latest"];

/**
 * Generate an advisory moderation suggestion for a reported user.
 * @param {Object} params
 * @param {string} params.reason - Report category (e.g. Harassment, Spam)
 * @param {string} params.details - Details text provided by reporter
 * @param {string} params.reportedUserRole - Role of the reported user (seeker, landlord, etc.)
 * @returns {Promise<{ action: string, justification: string } | null>}
 */
export async function getAiModerationSuggestion({ reason, details, reportedUserRole = "user" }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[aiModerator] GEMINI_API_KEY not configured in environment.");
    return null;
  }

  const promptText = `You are a trust & safety moderation assistant for Basera, a verified student roommate matching platform.
Review the following user incident report:
- Report Reason: "${reason || "Unspecified"}"
- Report Details: "${(details || "No details provided").replace(/"/g, '\\"')}"
- Reported User Role: "${reportedUserRole}"

Evaluate policy compliance and select ONE recommended action from: "dismiss", "warn", "suspend", "ban".
Provide a clear, objective one-sentence justification.

Respond ONLY with valid JSON in this exact structure:
{"action": "warn", "justification": "First-time mild policy violation warrants an advisory warning."}`;

  console.log(`[aiModerator] Requesting suggestion for reason: "${reason}", role: "${reportedUserRole}"`);

  for (const model of GEMINI_MODELS) {
    try {
      console.log(`[aiModerator] Trying model: ${model}`);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`[aiModerator] Model ${model} returned HTTP ${response.status}:`, errText);
        continue; // Try fallback model
      }

      const data = await response.json();
      const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(`[aiModerator] Model ${model} returned candidate text:`, textOutput);
      if (!textOutput) continue;

      // Extract JSON substring if wrapped in markdown fences
      const jsonMatch = textOutput.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const validActions = ["dismiss", "warn", "suspend", "ban"];
        const normalizedAction = String(parsed.action || "").toLowerCase().trim();

        if (validActions.includes(normalizedAction)) {
          console.log(`[aiModerator] Successfully parsed recommendation:`, normalizedAction);
          return {
            action: normalizedAction,
            justification: String(parsed.justification || "Advisory based on reported incident details.").trim(),
            modelUsed: model,
          };
        }
      }
    } catch (err) {
      console.error(`[aiModerator] Exception calling model ${model}:`, err.message);
      continue;
    }
  }

  console.warn("[aiModerator] All models exhausted without returning a valid action.");
  return null;
}
