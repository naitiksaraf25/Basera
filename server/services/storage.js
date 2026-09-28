import { GridFSBucket } from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import { getMongoClientAndDb } from "../db.js";

// Check if Cloudinary credentials are provided via environment variables
const hasCloudinary = Boolean(
  process.env.CLOUDINARY_URL ||
  (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
);

if (hasCloudinary) {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  console.log("[Storage Engine] Initialized Cloudinary persistent cloud storage provider.");
} else {
  console.log("[Storage Engine] Cloudinary not configured. Defaulting to MongoDB Atlas GridFS persistent storage (Zero external credentials required, 100% persistent across serverless invocations).");
}

/**
 * Persists an in-memory uploaded file buffer to either Cloudinary (if configured) or MongoDB GridFS.
 * Guarantees persistence across serverless invocations without writing to ephemeral /tmp.
 *
 * @param {Object} params
 * @param {Buffer} params.buffer File buffer from multer memoryStorage
 * @param {string} params.originalname Original uploaded filename
 * @param {string} params.mimetype MIME type (e.g. image/jpeg, application/pdf)
 * @param {number} params.size File size in bytes
 * @param {string} params.category "photos" | "documents"
 * @param {string} params.userId User ID of the uploader
 * @returns {Promise<{ url: string, filename: string, storageType: 'cloudinary' | 'gridfs' }>}
 */
export async function saveUploadedFile({ buffer, originalname, mimetype, size, category = "photos", userId = "user" }) {
  const ext = path.extname(originalname).toLowerCase() || (mimetype === "application/pdf" ? ".pdf" : ".png");
  const uniqueFilename = `${category === "documents" ? "id" : "photo"}_${userId}_${Date.now()}_${Math.round(Math.random() * 1e4)}${ext}`;

  // 1. Cloudinary upload branch (if user provided Cloudinary credentials)
  if (hasCloudinary) {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `basera/${category}`,
            public_id: path.parse(uniqueFilename).name,
            resource_type: mimetype === "application/pdf" ? "raw" : "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      return {
        url: result.secure_url,
        filename: uniqueFilename,
        storageType: "cloudinary",
      };
    } catch (err) {
      console.warn("[Storage Engine] Cloudinary upload failed, falling back to MongoDB GridFS:", err.message);
    }
  }

  // 2. MongoDB GridFS persistent storage branch (Atlas-backed, serverless-native)
  const { db } = await getMongoClientAndDb();
  const bucket = new GridFSBucket(db, { bucketName: "uploads" });

  await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(uniqueFilename, {
      metadata: {
        contentType: mimetype,
        category,
        userId: String(userId),
        originalName: originalname,
        size,
        uploadedAt: new Date().toISOString(),
      },
    });

    uploadStream.on("finish", resolve);
    uploadStream.on("error", reject);
    uploadStream.end(buffer);
  });

  const relativeUrl = category === "documents"
    ? `/api/documents/${uniqueFilename}`
    : `/api/photos/${uniqueFilename}`;

  return {
    url: relativeUrl,
    filename: uniqueFilename,
    storageType: "gridfs",
  };
}

/**
 * Retrieves a file stream from MongoDB GridFS or local fallback.
 *
 * @param {string} filename Name of the file
 * @param {string} [fallbackLocalDir] Optional local directory path for legacy files
 * @returns {Promise<{ stream: NodeJS.ReadableStream, contentType: string, size?: number } | null>}
 */
export async function getFileStream(filename, fallbackLocalDir = null) {
  // Check MongoDB GridFS first
  try {
    const { db } = await getMongoClientAndDb();
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });
    const files = await bucket.find({ filename }).toArray();

    if (files && files.length > 0) {
      const file = files[0];
      const downloadStream = bucket.openDownloadStreamByName(filename);
      return {
        stream: downloadStream,
        contentType: file.metadata?.contentType || "application/octet-stream",
        size: file.length,
        source: "gridfs",
      };
    }
  } catch (err) {
    console.error("[Storage Engine] GridFS retrieval error:", err.message);
  }

  // Check legacy local disk fallback (e.g. for development or pre-existing files)
  if (fallbackLocalDir) {
    const localPath = path.join(fallbackLocalDir, filename);
    if (fs.existsSync(localPath)) {
      return {
        stream: fs.createReadStream(localPath),
        contentType: "application/octet-stream",
        size: fs.statSync(localPath).size,
        source: "disk",
      };
    }
  }

  return null;
}
