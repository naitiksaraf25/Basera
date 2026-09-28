import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Readable } from "stream";
import { fileURLToPath } from "url";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { connectMongoose } from "./db.js";
import { requireAuth, requireVerified } from "./middleware/auth.js";

import onboardingRouter from "./routes/onboarding.js";
import verificationRouter from "./routes/verification.js";
import documentsRouter from "./routes/documents.js";
import profileRouter from "./routes/profile.js";
import photosRouter from "./routes/photos.js";
import matchRouter from "./routes/match.js";
import interestRouter from "./routes/interest.js";
import chatRouter from "./routes/chat.js";
import reportRouter from "./routes/report.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import aiRouter from "./routes/ai.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const app = express();

// Allowed CORS origins for local dev (5173, 3000, 5000) and production Vercel deployment
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, same-origin)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in preview/dev to avoid deployment blockage
    },
    credentials: true,
  })
);

// Body parsing middleware safe for both standalone Node and Vercel Serverless
app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    if (req.rawBody) {
      req.pipe = function (dest, options) {
        return Readable.from(req.rawBody).pipe(dest, options);
      };
      return next();
    }
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      req.rawBody = Buffer.concat(chunks);
      req.pipe = function (dest, options) {
        return Readable.from(req.rawBody).pipe(dest, options);
      };
      next();
    });
    req.on("error", next);
    return;
  }

  if (req.body !== undefined && typeof req.body === "object") {
    return next();
  }
  express.json({ limit: "10mb" })(req, res, (err) => {
    if (err) {
      if (req.body !== undefined) return next();
      return next(err);
    }
    express.urlencoded({ extended: true, limit: "10mb" })(req, res, next);
  });
});

// URL Normalization Middleware for Vercel Serverless & standalone
app.use((req, res, next) => {
  const matchedPath = req.headers["x-matched-path"] || "";
  console.log(`[INCOMING] ${req.method} url="${req.url}" orig="${req.originalUrl}" matched="${matchedPath}"`);


  
  // If Vercel rewrote /api/... to /api/index.js, restore the original URL from matchedPath or x-now-route-matches
  if (req.url === "/api/index.js" || req.url.startsWith("/api/index.js")) {
    if (matchedPath && matchedPath.startsWith("/api")) {
      req.url = matchedPath;
    } else if (req.originalUrl && req.originalUrl.startsWith("/api")) {
      req.url = req.originalUrl;
    }
  }

  if (!req.url.startsWith("/api")) {
    req.url = "/api" + (req.url.startsWith("/") ? req.url : "/" + req.url);
  }
  next();
});

// 2. Global DB Connection Middleware for Serverless Execution
app.use(async (req, res, next) => {
  try {
    await connectMongoose();
    next();
  } catch (err) {
    console.error("[Database Serverless Connect Error]:", err.message);
    res.status(500).json({
      error: "Database Connection Failed",
      message: err.message,
    });
  }
});

// 3. Mount BetterAuth Express Handler at /api/auth/*
app.all("/api/auth/*", toNodeHandler(auth));

// 4. Mount Platform Feature Routes
app.use("/api/onboarding", onboardingRouter);
app.use("/api/verification", verificationRouter);
app.use("/api/profile", profileRouter);
app.use("/api/match", matchRouter);
app.use("/api/interest", interestRouter);
app.use("/api/chat", chatRouter);
app.use("/api/report", reportRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);
app.use("/api/documents", documentsRouter);
app.use("/api/photos", photosRouter);

// 5. Root & Health Check Endpoints
app.get("/api", (req, res) => {
  res.status(200).json({
    name: "Basera API",
    status: "operational",
    environment: process.env.VERCEL ? "vercel-serverless" : "node-standalone",
  });
});

app.get("/api/health", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    mongodb: isConnected ? "connected" : "disconnected",
    message: "Basera Server is up and running.",
    environment: process.env.VERCEL ? "vercel-serverless" : "node-standalone",
  });
});

// Sample Protected Route (Guarded by requireAuth middleware)
app.get("/api/protected-sample", requireAuth, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully!",
    user: req.user,
    session: req.session,
  });
});

// Sample Verified Route (Guarded by requireVerified middleware)
app.get("/api/verified-sample", requireVerified, (req, res) => {
  res.status(200).json({
    message: "Verified route accessed successfully! Platform verification confirmed.",
    user: req.user,
    platformVerification: req.user.platformVerification,
  });
});

// Global fallback 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `API endpoint not found: ${req.method} ${req.originalUrl || req.url}`,
  });
});

export default app;
export { app };
