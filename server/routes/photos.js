import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getFileStream } from "../services/storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const legacyPhotosDir = path.join(__dirname, "../uploads/photos");

/**
 * GET /api/photos/:filename
 * Serves public profile and listing photos from persistent MongoDB GridFS or legacy local storage.
 */
router.get("/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return res.status(400).json({ error: "Invalid Request", message: "Invalid filename" });
    }

    const fileData = await getFileStream(filename, legacyPhotosDir);

    if (!fileData) {
      return res.status(404).json({ error: "Not Found", message: "Photo file not found" });
    }

    res.setHeader("Content-Type", fileData.contentType);
    res.setHeader("Cache-Control", "public, max-age=86400, immutable");
    if (fileData.size) {
      res.setHeader("Content-Length", fileData.size);
    }

    fileData.stream.pipe(res);
  } catch (err) {
    console.error("[Photo Serve Error]:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

export default router;
