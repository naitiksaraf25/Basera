import dns from "dns";

// Use public DNS resolvers for reliable MongoDB Atlas SRV resolution
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore in restricted environments
}

import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/basera";

/**
 * 1. Global Mongoose Connection Caching for Serverless Warm Lambdas
 */
let cachedMongoose = global._cachedMongoose;
if (!cachedMongoose) {
  cachedMongoose = global._cachedMongoose = { conn: null, promise: null };
}

export async function connectMongoose() {
  if (cachedMongoose.conn && mongoose.connection.readyState === 1) {
    return cachedMongoose.conn;
  }

  if (!cachedMongoose.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cachedMongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        console.log("[Mongoose] Connected to MongoDB (Cached Connection Pool)");
        return m;
      })
      .catch((err) => {
        console.error(
          `[Mongoose Connection Error] (${err.message}). Retrying with DNS override...`
        );
        try {
          dns.setServers(["8.8.8.8", "1.1.1.1"]);
        } catch (e) {}
        return mongoose.connect(MONGODB_URI, opts);
      });
  }

  try {
    cachedMongoose.conn = await cachedMongoose.promise;
  } catch (err) {
    cachedMongoose.promise = null;
    throw err;
  }

  return cachedMongoose.conn;
}

/**
 * 2. Global MongoClient Connection Caching for BetterAuth and Direct Operations
 */
let cachedClient = global._cachedMongoClient;
let cachedDb = global._cachedMongoDb;

export async function getMongoClientAndDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!global._cachedMongoPromise) {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    global._cachedMongoPromise = client
      .connect()
      .then((c) => {
        cachedClient = global._cachedMongoClient = c;
        cachedDb = global._cachedMongoDb = c.db();
        console.log("[MongoClient] Connected to MongoDB (Cached Client Pool)");
        return { client: cachedClient, db: cachedDb };
      })
      .catch((err) => {
        console.error(
          `[MongoClient Connection Error] (${err.message}). Retrying...`
        );
        try {
          dns.setServers(["8.8.8.8", "1.1.1.1"]);
        } catch (e) {}
        const retryClient = new MongoClient(MONGODB_URI, {
          serverSelectionTimeoutMS: 10000,
        });
        return retryClient.connect().then((c) => {
          cachedClient = global._cachedMongoClient = c;
          cachedDb = global._cachedMongoDb = c.db();
          return { client: cachedClient, db: cachedDb };
        });
      });
  }

  return global._cachedMongoPromise;
}

/**
 * Helper to get the BetterAuth user collection dynamically
 */
export async function getUserCollection() {
  const { db } = await getMongoClientAndDb();
  return db.collection("user");
}

/**
 * Helper to find user in BetterAuth user collection
 */
export async function findUser(filter) {
  const col = await getUserCollection();
  const user = await col.findOne(filter);
  if (user && !user.id) {
    user.id = user._id;
  }
  return user;
}

/**
 * Helper to update user record in BetterAuth user collection
 */
export async function updateUser(filter, updateFields) {
  const col = await getUserCollection();
  await col.updateOne(filter, { $set: updateFields });
  const updatedUser = await col.findOne(filter);
  if (updatedUser && !updatedUser.id) {
    updatedUser.id = updatedUser._id;
  }
  return updatedUser;
}

export { MONGODB_URI, ObjectId };
