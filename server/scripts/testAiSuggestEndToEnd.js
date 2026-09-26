import dns from "dns";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;

import { auth } from "../auth.js";

async function run() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  // Find admin user
  const adminUser = await db.collection("user").findOne({ email: "naitiksaraf2507@gmail.com" });
  console.log("Admin user found:", adminUser?.email, "role:", adminUser?.role);

  // Find or create an unexpired session for admin
  let session = await db.collection("session").findOne({
    userId: adminUser._id,
    expiresAt: { $gt: new Date() }
  });

  if (!session) {
    console.log("Updating an existing session to be valid for 30 more days...");
    const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const existing = await db.collection("session").findOne({ userId: adminUser._id });
    if (existing) {
      await db.collection("session").updateOne({ _id: existing._id }, { $set: { expiresAt: expiry } });
      session = { ...existing, expiresAt: expiry };
    }
  }

  console.log("Session token:", session?.token, "expiresAt:", session?.expiresAt);

  const { makeSignature } = await import("better-auth/crypto");
  const signature = await makeSignature(session.token, BETTER_AUTH_SECRET);
  const cookie = `better-auth.session_token=${session.token}.${signature}`;
  console.log("Cookie created with exact makeSignature:", cookie);

  // Find or create a pending report
  let pendingReport = await db.collection("reports").findOne({ status: "pending" });
  if (!pendingReport) {
    console.log("Creating a pending report for test...");
    const newReport = {
      reporterId: adminUser.id || adminUser._id,
      reportedUserId: "test_reported_user_123",
      reportedUserType: "user",
      reason: "Spam / Commercial advertising",
      details: "User keeps sending unsolicited links to fake external payment gateways requesting advance deposit for non-existent flat.",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const res = await db.collection("reports").insertOne(newReport);
    pendingReport = { ...newReport, _id: res.insertedId };
  }

  console.log("Using pending report ID:", pendingReport._id.toString());
  console.log("Reason:", pendingReport.reason);
  console.log("Details:", pendingReport.details);

  // Call the endpoint
  const url = `http://localhost:5000/api/admin/reports/${pendingReport._id.toString()}/ai-suggest`;
  console.log("Calling endpoint:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie
    }
  });

  console.log("HTTP Status:", res.status);
  const data = await res.json();
  console.log("Exact API Response:\n", JSON.stringify(data, null, 2));

  await client.close();
}

run().catch(console.error);
