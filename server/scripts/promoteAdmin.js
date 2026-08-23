import dns from "dns";

// Use public DNS resolvers for reliable MongoDB Atlas SRV resolution on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore if dns override fails in restricted environments
}

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/roomiematch";

async function promoteAdminCLI() {
  const target = process.argv[2];

  if (!target) {
    console.error("Usage: node server/scripts/promoteAdmin.js <userEmailOrUserId>");
    process.exit(1);
  }

  console.log(`[promoteAdmin CLI] Connecting to MongoDB at ${MONGODB_URI}...`);
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const collections = await db.listCollections().toArray();
    const collectionName = collections.some((c) => c.name === "user") ? "user" : "users";

    const filter = {
      $or: [{ _id: target }, { id: target }, { email: target.toLowerCase() }],
    };

    const userDoc = await db.collection(collectionName).findOne(filter);

    if (!userDoc) {
      console.error(`[promoteAdmin CLI Error] No user found matching '${target}'`);
      process.exit(1);
    }

    const result = await db.collection(collectionName).updateOne(filter, {
      $set: {
        role: "admin",
        updatedAt: new Date().toISOString(),
      },
    });

    if (result.modifiedCount > 0 || userDoc.role === "admin") {
      console.log(
        `[promoteAdmin CLI Success] User '${userDoc.email}' (ID: ${userDoc.id || userDoc._id}) is now an admin.`
      );
    } else {
      console.log(`[promoteAdmin CLI Info] User '${userDoc.email}' already had role: 'admin'.`);
    }
  } catch (err) {
    console.error("[promoteAdmin CLI Fatal Error]:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

promoteAdminCLI();
