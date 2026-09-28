import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth } from "../middleware/auth.js";
import { getFileStream } from "../services/storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const legacyUploadDir = path.join(__dirname, "../uploads/ids");

/**
 * GET /api/documents/:filename
 * Securely serves private government ID documents from persistent MongoDB GridFS or legacy local storage.
 * Access is restricted exclusively to:
 * 1. The document owner (matching req.user.id or req.user.platformVerification.idDocumentUrl)
 * 2. Platform Admins (req.user.role === 'admin')
 */
router.get("/:filename", requireAuth, async (req, res) => {
  try {
    const filename = req.params.filename;

    // Prevent path traversal attacks
    if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return res.status(400).json({ error: "Invalid Request", message: "Invalid filename" });
    }

    const isOwner =
      req.user?.platformVerification?.idDocumentUrl === `/api/documents/${filename}` ||
      filename.includes(`_${req.user?.id}_`);

    const isAdmin = req.user?.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        error: "Forbidden",
        message: "Access denied. ID documents can only be viewed by the document owner or platform admin reviewers.",
      });
    }

    const fileData = await getFileStream(filename, legacyUploadDir);

    if (!fileData) {
      return res.status(404).json({ error: "Not Found", message: "Document file not found" });
    }

    res.setHeader("Content-Type", fileData.contentType);
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    if (fileData.size) {
      res.setHeader("Content-Length", fileData.size);
    }

    fileData.stream.pipe(res);
  } catch (err) {
    console.error("[Document Serve Error]:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

export default router;
