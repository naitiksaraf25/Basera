import express from "express";
import { requireAuth } from "../middleware/auth.js";
import Report from "../models/Report.js";

const router = express.Router();

const VALID_REASONS = [
  "Harassment",
  "Spam",
  "Inappropriate Content",
  "Fake Listing",
  "Safety Concern",
  "Other",
];

/**
 * POST /api/report
 * Submit a report against another user from a profile view or chat.
 * Protected by requireAuth.
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const reporterId = String(req.user.id || req.user._id);
    const { reportedUserId, reason, details } = req.body;

    if (!reportedUserId || !reason) {
      return res.status(400).json({
        error: "Bad Request",
        message: "reportedUserId and reason are required.",
      });
    }

    // 1. Self-report guard: Reject if reporter attempts to report themselves
    if (reporterId === String(reportedUserId)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Users cannot report themselves.",
      });
    }

    if (!VALID_REASONS.includes(reason)) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Invalid reason. Must be one of: ${VALID_REASONS.join(", ")}`,
      });
    }

    const newReport = await Report.create({
      reporterId,
      reportedUserId: String(reportedUserId),
      reason,
      details: details ? String(details).trim() : "",
      status: "pending",
      actionTaken: "none",
    });

    return res.status(201).json({
      message:
        "Report submitted successfully. Platform moderators will review it shortly.",
      report: newReport,
    });
  } catch (err) {
    console.error("[Report API Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

export default router;
