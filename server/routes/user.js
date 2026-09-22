import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const router = express.Router();
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/basera";

/**
 * POST /api/user/acknowledge-warning
 * Acknowledge a moderation warning issued to the current user.
 * Protected by requireAuth.
 * STRICT OWNERSHIP SCOPING: Query strictly matches the current user's ID (_id / id) AND the warningId inside their own warnings array.
 * If warningId does not belong to current user, returns HTTP 404 Not Found.
 */
router.post("/acknowledge-warning", requireAuth, async (req, res) => {
  try {
    const currentUserId = String(req.user.id || req.user._id);
    const { warningId } = req.body;

    if (!warningId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "warningId is required.",
      });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();

    const collections = await db.listCollections().toArray();
    const collectionName = collections.some((c) => c.name === "user")
      ? "user"
      : "users";

    const filterConditions = [{ _id: currentUserId }, { id: currentUserId }];
    if (ObjectId.isValid(currentUserId)) {
      filterConditions.push({ _id: new ObjectId(currentUserId) });
    }

    // Strictly scope query filter to current authenticated user's ID AND matching warningId
    const userFilter = {
      $and: [{ $or: filterConditions }, { "warnings.id": warningId }],
    };

    const userDoc = await db.collection(collectionName).findOne(userFilter);

    if (!userDoc) {
      await client.close();
      return res.status(404).json({
        error: "Not Found",
        message: "Warning not found or does not belong to current user.",
      });
    }

    const acknowledgedAt = new Date().toISOString();

    // Update specific warning element in user's warnings array
    await db.collection(collectionName).updateOne(
      {
        $or: filterConditions,
        "warnings.id": warningId,
      },
      {
        $set: {
          "warnings.$.acknowledged": true,
          "warnings.$.acknowledgedAt": acknowledgedAt,
          updatedAt: acknowledgedAt,
        },
      },
    );

    const updatedUser = await db.collection(collectionName).findOne({
      $or: filterConditions,
    });
    await client.close();

    if (updatedUser && !updatedUser.id) {
      updatedUser.id = updatedUser._id;
    }

    return res.status(200).json({
      message: "Warning acknowledged successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("[Acknowledge Warning Error]:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

export default router;
