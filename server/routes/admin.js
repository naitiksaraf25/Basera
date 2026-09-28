import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import Report from "../models/Report.js";
import { getAiModerationSuggestion } from "../services/aiModerator.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { findUser, updateUser, getUserCollection, ObjectId } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const router = express.Router();

// Protect ALL routes in this router with requireAdmin
router.use(requireAdmin);

/**
 * POST /api/admin/promote
 * Promotes a specified user to role: "admin".
 * Strictly guarded by requireAdmin middleware.
 */
router.post("/promote", async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId && !email) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Either userId or email must be provided to promote.",
      });
    }

    const filter = userId
      ? { $or: [{ _id: userId }, { id: userId }] }
      : { email: email.toLowerCase() };

    const targetUser = await findUser(filter);
    if (!targetUser) {
      return res.status(404).json({
        error: "Not Found",
        message: "Target user for promotion not found.",
      });
    }

    const updatedUser = await updateUser(filter, {
      role: "admin",
      updatedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      message: `User '${updatedUser.email}' successfully promoted to admin.`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("[Admin Promote Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

/**
 * GET /api/admin/reports
 * Fetch all platform reports for admin moderation.
 */
router.get("/reports", async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const reports = await Report.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      reports,
    });
  } catch (err) {
    console.error("[Admin Get Reports Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

/**
 * POST /api/admin/reports/:id/action
 * Take moderation action on a report (dismiss, warn, suspend, ban).
 */
router.post("/reports/:id/action", async (req, res) => {
  try {
    const reportId = req.params.id;
    const { action } = req.body;

    const validActions = ["dismiss", "warn", "suspend", "ban"];
    if (!action || !validActions.includes(action)) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Action must be one of: ${validActions.join(", ")}`,
      });
    }

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({
        error: "Not Found",
        message: "Report not found.",
      });
    }

    const actionTakenMap = {
      dismiss: "none",
      warn: "warned",
      suspend: "suspended",
      ban: "banned",
    };

    report.status = action === "dismiss" ? "dismissed" : "actioned";
    report.actionTaken = actionTakenMap[action];
    await report.save();

    // If action is warn, append warning object to target user's warnings array
    if (action === "warn") {
      const targetUserId = String(report.reportedUserId);
      const filterConditions = [{ _id: targetUserId }, { id: targetUserId }];
      if (ObjectId.isValid(targetUserId)) {
        filterConditions.push({ _id: new ObjectId(targetUserId) });
      }
      const filter = { $or: filterConditions };

      const newWarning = {
        id: `warn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        reportId: String(report._id || report.id),
        reason: report.reason,
        message:
          req.body.warningMessage ||
          `You have received a warning from platform moderators regarding '${report.reason}'. Please review our community guidelines.`,
        createdAt: new Date().toISOString(),
        acknowledged: false,
        acknowledgedAt: null,
      };

      const col = await getUserCollection();
      await col.updateOne(filter, {
        $push: { warnings: newWarning },
        $set: { updatedAt: new Date().toISOString() },
      });
    }

    // If action is suspend or ban, update target user's accountStatus
    if (action === "suspend" || action === "ban") {
      const targetUserId = String(report.reportedUserId);
      const filterConditions = [{ _id: targetUserId }, { id: targetUserId }];
      if (ObjectId.isValid(targetUserId)) {
        filterConditions.push({ _id: new ObjectId(targetUserId) });
      }
      const filter = { $or: filterConditions };

      await updateUser(filter, {
        accountStatus: action === "suspend" ? "suspended" : "banned",
        updatedAt: new Date().toISOString(),
      });
    }

    return res.status(200).json({
      message: `Report action '${action}' applied successfully.`,
      report,
    });
  } catch (err) {
    console.error("[Admin Report Action Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

/**
 * POST /api/admin/reports/:reportId/ai-suggest
 * Generates an advisory trust & safety action suggestion via Gemini API.
 * Advisory only — admin still manually applies any moderation action.
 * Strictly guarded by requireAdmin middleware.
 * Never leaks GEMINI_API_KEY in any response payload or error.
 */
router.post("/reports/:reportId/ai-suggest", async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({
        error: "Not Found",
        message: "Report not found.",
      });
    }

    // Look up reported user to determine role
    const reportedUserId = String(report.reportedUserId);
    const filterConditions = [{ _id: reportedUserId }, { id: reportedUserId }];
    if (ObjectId.isValid(reportedUserId)) {
      filterConditions.push({ _id: new ObjectId(reportedUserId) });
    }
    const reportedUser = await findUser({ $or: filterConditions });

    // Call server-side Gemini moderation service
    const suggestion = await getAiModerationSuggestion({
      reason: report.reason,
      details: report.details,
      reportedUserRole: reportedUser?.role || "user",
    });

    if (!suggestion) {
      return res.status(200).json({
        available: false,
        message: "AI suggestion unavailable",
        suggestion: null,
      });
    }

    return res.status(200).json({
      available: true,
      reportId: report._id,
      suggestion: {
        action: suggestion.action,
        justification: suggestion.justification,
      },
    });
  } catch (err) {
    console.error("[Admin AI Suggest Action Error]:", err);
    return res.status(200).json({
      available: false,
      message: "AI suggestion unavailable",
      suggestion: null,
    });
  }
});

/**
 * GET /api/admin/verifications
 * Retrieve list of pending landlord ID and college email verification requests.
 */
router.get("/verifications", async (req, res) => {
  try {
    const col = await getUserCollection();
    const pendingUsers = await col
      .find({ "platformVerification.status": "pending" })
      .toArray();

    const formattedUsers = pendingUsers.map((u) => {
      if (!u.id) u.id = u._id;
      return u;
    });

    return res.status(200).json({
      verifications: formattedUsers,
    });
  } catch (err) {
    console.error("[Admin Get Verifications Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

/**
 * POST /api/admin/verifications/:userId/action
 * Approve or reject pending user verification request.
 */
router.post("/verifications/:userId/action", async (req, res) => {
  try {
    const { userId } = req.params;
    const { action, rejectionReason } = req.body;

    if (!action || !["approve", "reject"].includes(action)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Action must be either 'approve' or 'reject'.",
      });
    }

    const filter = { $or: [{ _id: userId }, { id: userId }] };
    const userDoc = await findUser(filter);

    if (!userDoc) {
      return res.status(404).json({
        error: "Not Found",
        message: "User not found.",
      });
    }

    const newVerificationStatus =
      action === "approve" ? "verified" : "rejected";
    const updatedVerification = {
      ...(userDoc.platformVerification || {}),
      status: newVerificationStatus,
      reviewedAt: new Date().toISOString(),
      ...(action === "reject" && rejectionReason ? { rejectionReason } : {}),
    };

    const updatedUser = await updateUser(filter, {
      platformVerification: updatedVerification,
      updatedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      message: `Verification ${action}d successfully.`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("[Admin Verification Action Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

export default router;
