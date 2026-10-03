import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { updateUser } from "../db.js";
import { verifyCollegeDomain, COLLEGE_ALLOWLIST } from "../services/collegeVerification.js";

const router = express.Router();

export { COLLEGE_ALLOWLIST };

// Helper to update user in MongoDB directly
async function updateUserRecord(user, updateFields) {
  const userId = user.id || user._id;
  const filter = { $or: [{ _id: userId }, { id: userId }, { email: user.email }] };
  return updateUser(filter, updateFields);
}

/**
 * POST /api/onboarding/role
 * Sets the user role after initial authentication.
 */
router.post("/role", requireAuth, async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ["seeker", "resident", "landlord"];

    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        error: "Invalid Role",
        message: "Role must be one of: seeker, resident, landlord",
      });
    }

    const email = req.user.email || "";
    const emailDomain = email.split("@")[1]?.toLowerCase() || "";
    let platformVerification = req.user.platformVerification || { status: "pending" };

    if (role === "seeker" || role === "resident") {
      const verificationCheck = await verifyCollegeDomain(email);
      if (verificationCheck.isVerified) {
        platformVerification = {
          status: "verified",
          method: verificationCheck.method,
          collegeEmail: email,
          institutionName: verificationCheck.institutionName || null,
          verifiedAt: new Date().toISOString(),
          notes: verificationCheck.reason,
        };
      } else {
        platformVerification = {
          status: "pending",
          method: "college_email",
          collegeEmail: emailDomain ? email : null,
          institutionName: verificationCheck.institutionName || null,
          notes: verificationCheck.reason || "Domain queued for manual admin verification review.",
          submittedAt: new Date().toISOString(),
        };
      }
    } else if (role === "landlord") {
      platformVerification = {
        status: "pending",
        method: "government_id",
        idDocumentUrl: req.user.platformVerification?.idDocumentUrl || null,
      };
    }

    const updatedUser = await updateUserRecord(req.user, {
      role,
      platformVerification,
      updatedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      message: "Role and initial verification status set successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("[Onboarding Role Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

export default router;
