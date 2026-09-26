import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const router = express.Router();

const GEMINI_MODELS = ["gemini-3.8-flash", "gemini-flash-latest"];

const SYSTEM_INSTRUCTION = `You are "Basera Concierge", a warm, concise, and helpful AI assistant for Basera — India's verified student & young professional roommate and PG matching platform.

Key Information about Basera:
1. Compatibility Matching: We match flatmates and roommates on real lifestyle parameters — sleep schedule (early bird vs night owl), dietary preference (veg/non-veg/jain), cleanliness level, guest habits, smoking/drinking, and budget.
2. 100% Verified Community: Every profile and listing is verified via college ID/email or government ID to eliminate fake listings, brokers, and fraud.
3. Zero Brokerage: Directly connect with prospective roommates or property owners. No middleman fees or commissions.
4. Smart Search across India: Active across 30+ top student hubs including Delhi NCR, Bengaluru, Mumbai, Pune, Hyderabad, Kota, Jaipur, Chennai, and more.
5. In-App Secure Chats: Talk safely within Basera before exchanging numbers or meeting in person.

Guidelines:
- Keep answers concise, helpful, and under 3 sentences whenever possible.
- Be friendly, encouraging, and clear.
- You are an informational assistant answering visitor questions. You cannot directly book rooms, charge payments, or modify accounts.
- If someone asks how to get started, suggest clicking "Sign In" or "Get Started" to complete their lifestyle quiz and view matches!`;

/**
 * POST /api/ai/chat
 * Public endpoint for visitors to ask questions about Basera.
 * Server-side proxy: GEMINI_API_KEY is never exposed to the client.
 */
router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Message string is required.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        reply:
          "Welcome to Basera! We match compatible roommates and verified student housing with zero brokerage across India. Please create an account or sign in to start exploring!",
      });
    }

    // Build context with history (last 4 turns max to keep latency low)
    const recentHistory = Array.isArray(history) ? history.slice(-4) : [];
    const formattedContents = [
      {
        role: "user",
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nPlease acknowledge your role briefly.` }],
      },
      {
        role: "model",
        parts: [{ text: "Understood! I am Basera Concierge, ready to help visitors learn about our roommate matching and verified housing platform." }],
      },
    ];

    for (const item of recentHistory) {
      if (item.sender === "user" && item.text) {
        formattedContents.push({
          role: "user",
          parts: [{ text: item.text }],
        });
      } else if (item.sender === "bot" && item.text) {
        formattedContents.push({
          role: "model",
          parts: [{ text: item.text }],
        });
      }
    }

    // Add current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message.trim() }],
    });

    let replyText = null;

    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: formattedContents }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) break;
      } catch (err) {
        continue;
      }
    }

    if (!replyText) {
      // Graceful fallback response
      replyText =
        "Basera connects you with verified roommates and student PGs based on lifestyle compatibility with zero brokerage. Feel free to explore our verified rooms or take our compatibility quiz!";
    }

    return res.status(200).json({
      reply: replyText.trim(),
    });
  } catch (err) {
    console.error("[AI Chatbot Error]:", err.message);
    return res.status(200).json({
      reply:
        "Basera connects you with verified roommates and student PGs based on lifestyle compatibility with zero brokerage. Feel free to explore our verified rooms or take our compatibility quiz!",
    });
  }
});

export default router;
