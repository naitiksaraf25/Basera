import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { requireAuth } from "../middleware/auth.js";
import { verifyCollegeDomain, COLLEGE_ALLOWLIST } from "../services/collegeVerification.js";
import { getMongoClientAndDb, updateUser } from "../db.js";
import { saveUploadedFile } from "../services/storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer memory storage setup (zero reliance on ephemeral disk / tmp)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files (JPG, PNG, WEBP) or PDF documents are allowed"));
  },
});

// Cached DB helper
async function getDb() {
  return getMongoClientAndDb();
}

/**
 * POST /api/verification/college-email
 * Generates email verification token for student seekers.
 */
router.post("/college-email", requireAuth, async (req, res) => {
  try {
    const { collegeEmail } = req.body;

    if (!collegeEmail || !collegeEmail.includes("@")) {
      return res.status(400).json({
        error: "Bad Request",
        message: "A valid college email address is required.",
      });
    }

    const verificationCheck = await verifyCollegeDomain(collegeEmail);

    const { db } = await getDb();

    if (verificationCheck.isVerified) {
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await db.collection("college_verifications").insertOne({
        userId: req.user.id || req.user._id,
        userEmail: req.user.email,
        collegeEmail,
        institutionName: verificationCheck.institutionName || null,
        verificationMethod: verificationCheck.method,
        status: "verified_domain",
        token,
        expiresAt,
        createdAt: new Date(),
      });

      const verifyUrl = `/api/verification/verify-college-email?token=${token}`;

      console.log("==================================================");
      console.log(`[DEV COLLEGE EMAIL SENDER] College Email Verification for user ${req.user.id || req.user._id}`);
      console.log(`Submitted College Email: ${collegeEmail} (${verificationCheck.method} - ${verificationCheck.institutionName || ""})`);
      console.log(`Verification Link: ${verifyUrl}`);
      console.log("==================================================");

      return res.status(200).json({
        success: true,
        status: "verified",
        message: "Recognized educational institution! Verification link generated.",
        verifyUrl,
        token,
        institution: verificationCheck.institutionName,
        method: verificationCheck.method,
        notice: "In local development, inspect your server console for the verification link.",
      });
    }

    // Unrecognized or unconfirmed domain -> Queue for manual admin review (DO NOT HARD REJECT!)
    await db.collection("college_verifications").insertOne({
      userId: req.user.id || req.user._id,
      userEmail: req.user.email,
      collegeEmail,
      status: "pending_admin_review",
      reason: verificationCheck.reason,
      createdAt: new Date(),
    });

    // Update user record to pending with notes so admin review dashboard picks it up
    const userId = req.user.id || req.user._id;
    const filter = { $or: [{ _id: userId }, { id: userId }, { email: req.user.email }] };
    await updateUser(filter, {
      "platformVerification.status": "pending",
      "platformVerification.method": "college_email",
      "platformVerification.collegeEmail": collegeEmail,
      "platformVerification.institutionName": verificationCheck.institutionName || null,
      "platformVerification.notes": verificationCheck.reason || "Domain queued for manual admin verification review.",
      "platformVerification.submittedAt": new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      status: "pending",
      message: `Your college domain '@${verificationCheck.domain}' was not automatically recognized, but has been queued for manual review by our verification team. You are not blocked from continuing!`,
      reason: verificationCheck.reason,
    });
  } catch (err) {
    console.error("[College Email Verification Error]:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

/**
 * GET /api/verification/verify-college-email
 * Verifies college email token and sets user platform verification status to 'verified'.
 */
router.get("/verify-college-email", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).send("Verification token is required.");
    }

    const { db } = await getDb();
    const record = await db.collection("college_verifications").findOne({ token });

    if (!record) {
      return res.status(400).send("Invalid or expired verification token.");
    }

    if (new Date() > new Date(record.expiresAt)) {
      return res.status(400).send("Verification token has expired. Please request a new link.");
    }

    const collections = await db.listCollections().toArray();
    const collectionName = collections.some((c) => c.name === "user") ? "user" : "users";

    const filter = { $or: [{ _id: record.userId }, { id: record.userId }, { email: record.userEmail }] };

    await db.collection(collectionName).updateOne(
      filter,
      {
        $set: {
          platformVerification: {
            status: "verified",
            method: "college_email",
            collegeEmail: record.collegeEmail,
            verifiedAt: new Date().toISOString(),
          },
          updatedAt: new Date().toISOString(),
        },
      }
    );

    await db.collection("college_verifications").deleteOne({ _id: record._id });

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    return res.redirect(`${clientUrl}?verification=success`);
  } catch (err) {
    console.error("[Verify College Email Error]:", err);
    return res.status(500).send("Error verifying college email: " + err.message);
  }
});

/**
 * POST /api/verification/landlord-id
 * Uploads a government ID for landlord verification.
 */
router.post("/landlord-id", requireAuth, (req, res) => {
  upload.single("governmentId")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "Upload Error", message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Missing File", message: "Please select a government ID document to upload." });
    }

    try {
      const savedDoc = await saveUploadedFile({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        category: "documents",
        userId: req.user.id,
      });

      const documentPath = savedDoc.url;
      const { db } = await getDb();
      const collections = await db.listCollections().toArray();
      const collectionName = collections.some((c) => c.name === "user") ? "user" : "users";

      const filter = { $or: [{ _id: req.user.id }, { id: req.user.id }, { email: req.user.email }] };

      await db.collection(collectionName).updateOne(
        filter,
        {
          $set: {
            role: "landlord",
            platformVerification: {
              status: "pending",
              method: "government_id",
              idDocumentUrl: documentPath,
              uploadedAt: new Date().toISOString(),
            },
            updatedAt: new Date().toISOString(),
          },
        }
      );

      const updatedUser = await db.collection(collectionName).findOne(filter);

      return res.status(200).json({
        message: "Government ID uploaded successfully. Verification is pending admin review.",
        documentUrl: documentPath,
        user: updatedUser,
        note: "Landlord verification status is currently set to 'pending'.",
      });
    } catch (dbErr) {
      console.error("[Landlord ID DB Error]:", dbErr);
      return res.status(500).json({ error: "Database Error", message: dbErr.message });
    }
  });
});

export default router;
