// Comprehensive Vercel Dev Serverless API Test Suite
import { getMongoClientAndDb, updateUser } from "../db.js";
import { makeSignature } from "better-auth/crypto";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config();

const BASE_URL = "http://localhost:3000";
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    Origin: BASE_URL,
    ...(options.headers || {}),
  };
  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body
      ? (options.body instanceof FormData || typeof options.body === "string" ? options.body : JSON.stringify(options.body))
      : undefined,
    redirect: "manual",
  });

  let data;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else if (contentType.includes("image/") || contentType.includes("application/pdf")) {
    const arrayBuffer = await res.arrayBuffer();
    data = Buffer.from(arrayBuffer);
  } else {
    data = await res.text();
  }

  const setCookie = res.headers.get("set-cookie");

  return {
    status: res.status,
    headers: res.headers,
    setCookie,
    data,
  };
}

// Helper to create an active BetterAuth session and return signed cookie
async function createSignedSessionCookie(db, user) {
  const userId = user._id || user.id;
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await db.collection("session").insertOne({
    userId,
    token,
    expiresAt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const signature = await makeSignature(token, BETTER_AUTH_SECRET);
  return `better-auth.session_token=${token}.${signature}`;
}

async function runTests() {
  console.log("=================================================");
  console.log("   BASERA VERCEL DEV SERVERLESS VALIDATION SUITE ");
  console.log("=================================================");
  console.log(`Target: ${BASE_URL}\n`);

  const { db } = await getMongoClientAndDb();
  const results = [];

  function record(feature, testName, passed, details = "") {
    results.push({ feature, testName, passed, details });
    const mark = passed ? "PASS" : "FAIL";
    console.log(`[${mark}] [${feature}] ${testName} ${details ? "- " + details : ""}`);
  }

  // 1. Health & Serverless Basic Routes
  try {
    const healthRes = await request("/api/health");
    record(
      "Core",
      "GET /api/health",
      healthRes.status === 200 && healthRes.data?.status === "ok",
      `Status: ${healthRes.status}, MongoDB: ${healthRes.data?.mongodb}`
    );

    const rootApiRes = await request("/api");
    record(
      "Core",
      "GET /api",
      rootApiRes.status === 200 && rootApiRes.data?.status === "operational",
      `Status: ${rootApiRes.status}`
    );
  } catch (err) {
    record("Core", "Health Check", false, err.message);
  }

  // 2. Frontend Assets Serving via Vercel dev
  try {
    const homeRes = await request("/");
    record(
      "Frontend",
      "GET / (Vite client index.html)",
      homeRes.status === 200 && typeof homeRes.data === "string" && homeRes.data.includes("id=\"root\""),
      `Status: ${homeRes.status}, Length: ${typeof homeRes.data === "string" ? homeRes.data.length : 0}`
    );

    const faviconRes = await request("/favicon.ico");
    record(
      "Frontend",
      "GET /favicon.ico (Basera Favicon Asset)",
      faviconRes.status === 200,
      `Status: ${faviconRes.status}`
    );
  } catch (err) {
    record("Frontend", "Static Serving", false, err.message);
  }

  // 3. AI Concierge Widget
  try {
    const aiRes = await request("/api/ai/chat", {
      method: "POST",
      body: {
        message: "Hello Basera AI, what rooms do you have in Indiranagar?",
        history: [],
      },
    });
    record(
      "AI Concierge",
      "POST /api/ai/chat",
      aiRes.status === 200 && Boolean(aiRes.data?.reply),
      `Status: ${aiRes.status}, Reply: "${aiRes.data?.reply?.slice(0, 50)}..."`
    );
  } catch (err) {
    record("AI Concierge", "POST /api/ai/chat", false, err.message);
  }

  // 4. BetterAuth Session Handling: Sign-in / Verification via Signed Session
  let seekerUser = await db.collection("user").findOne({ email: "aarav.sharma@demo.basera.in" });
  if (!seekerUser) {
    seekerUser = await db.collection("user").findOne({ role: "seeker" });
  }

  // Ensure seeker user is verified for authenticated features
  await updateUser({ _id: seekerUser._id }, {
    email: "aarav.sharma@college.edu",
    role: "seeker",
    accountStatus: "active",
    platformVerification: {
      status: "verified",
      method: "college_email",
      collegeEmail: "aarav.sharma@college.edu",
      verifiedAt: new Date().toISOString()
    }
  });

  seekerUser.email = "aarav.sharma@college.edu";

  let seekerCookie = "";
  try {
    seekerCookie = await createSignedSessionCookie(db, seekerUser);

    const sessionRes = await request("/api/auth/get-session", {
      headers: { Cookie: seekerCookie },
    });
    record(
      "BetterAuth",
      "GET /api/auth/get-session (Signed Cookie Session)",
      sessionRes.status === 200 && Boolean(sessionRes.data?.user?.email),
      `User: ${sessionRes.data?.user?.email}, Role: ${sessionRes.data?.user?.role}`
    );
  } catch (err) {
    record("BetterAuth", "Session Verification", false, err.message);
  }

  // 5. Onboarding Flow
  try {
    const onboardingRes = await request("/api/onboarding/role", {
      method: "POST",
      headers: { Cookie: seekerCookie },
      body: { role: "seeker" },
    });
    record(
      "Onboarding",
      "POST /api/onboarding/role",
      onboardingRes.status === 200 && onboardingRes.data?.user?.role === "seeker",
      `Status: ${onboardingRes.status}, Role: ${onboardingRes.data?.user?.role}`
    );
  } catch (err) {
    record("Onboarding", "POST /api/onboarding/role", false, err.message);
  }

  // 6. Profile Feature (Save Lifestyle Profile & Retrieve)
  try {
    const saveProfileRes = await request("/api/profile/lifestyle", {
      method: "POST",
      headers: { Cookie: seekerCookie },
      body: {
        city: "Bengaluru",
        locality: "Koramangala",
        budgetMin: 8000,
        budgetMax: 15000,
        gender: "male",
        genderPreference: "male_only",
        sleepSchedule: "night_owl",
        cleanliness: 4,
        smokingDrinking: "none",
        foodPreference: "any",
        guestsFrequency: "weekends_only",
        bio: "CS student looking for a quiet flatmate in Koramangala.",
      },
    });
    record(
      "Profile",
      "POST /api/profile/lifestyle",
      saveProfileRes.status === 200 && Boolean(saveProfileRes.data?.profile),
      `Status: ${saveProfileRes.status}, City: ${saveProfileRes.data?.profile?.city}`
    );

    const getProfileRes = await request("/api/profile/lifestyle", {
      headers: { Cookie: seekerCookie },
    });
    record(
      "Profile",
      "GET /api/profile/lifestyle",
      getProfileRes.status === 200 && Boolean(getProfileRes.data?.profile),
      `Status: ${getProfileRes.status}, Locality: ${getProfileRes.data?.profile?.locality}`
    );
  } catch (err) {
    record("Profile", "Lifestyle Profile", false, err.message);
  }

  // 7. Persistent File Upload & Retrieval Test (Photo)
  let uploadedPhotoUrl = "";
  const samplePngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const samplePngBuffer = Buffer.from(samplePngBase64, "base64");

  try {
    const photoForm = new FormData();
    const photoBlob = new Blob([samplePngBuffer], { type: "image/png" });
    photoForm.append("photo", photoBlob, "avatar.png");
    photoForm.append("city", "Bengaluru");
    photoForm.append("locality", "Indiranagar");
    photoForm.append("budgetMin", "9000");
    photoForm.append("budgetMax", "16000");
    photoForm.append("gender", "male");
    photoForm.append("genderPreference", "male_only");
    photoForm.append("sleepSchedule", "night_owl");
    photoForm.append("cleanliness", "4");
    photoForm.append("smokingDrinking", "none");
    photoForm.append("foodPreference", "any");
    photoForm.append("guestsFrequency", "weekends_only");

    const uploadRes = await request("/api/profile/lifestyle", {
      method: "POST",
      headers: { Cookie: seekerCookie },
      body: photoForm,
    });

    uploadedPhotoUrl = uploadRes.data?.profile?.photoUrl || "";
    record(
      "Persistent Upload",
      "POST /api/profile/lifestyle (Multipart Photo Upload)",
      uploadRes.status === 200 && Boolean(uploadedPhotoUrl),
      `Status: ${uploadRes.status}, Body: ${JSON.stringify(uploadRes.data)}, Stored URL: ${uploadedPhotoUrl}`
    );

    // Retrieve the uploaded photo via its persistent URL
    const fetchPhotoRes = await request(uploadedPhotoUrl);
    const isBuffer = Buffer.isBuffer(fetchPhotoRes.data);
    const contentType = fetchPhotoRes.headers.get("content-type") || "";
    record(
      "Persistent Upload",
      `GET ${uploadedPhotoUrl} (Immediate Retrieval)`,
      fetchPhotoRes.status === 200 && contentType.includes("image/png") && isBuffer && fetchPhotoRes.data.length > 0,
      `Status: ${fetchPhotoRes.status}, Content-Type: ${contentType}, Bytes: ${fetchPhotoRes.data?.length}`
    );

    // Simulate fresh invocation / cold start: wait and verify data remains in MongoDB Atlas GridFS
    await new Promise((r) => setTimeout(r, 1000));
    const filename = uploadedPhotoUrl.split("/").pop();
    const gridFsFile = await db.collection("uploads.files").findOne({ filename });
    const isPersistedInAtlas = Boolean(gridFsFile && gridFsFile.length > 0);

    // Fetch again from endpoint to verify streaming from Atlas
    const secondFetchRes = await request(uploadedPhotoUrl);
    record(
      "Persistent Upload",
      `GET ${uploadedPhotoUrl} (Cold-Start Persistence from Atlas GridFS)`,
      secondFetchRes.status === 200 && isPersistedInAtlas && secondFetchRes.data?.length === samplePngBuffer.length,
      `Status: ${secondFetchRes.status}, Persisted in Atlas GridFS: ${isPersistedInAtlas}, Exact Bytes Match: ${secondFetchRes.data?.length === samplePngBuffer.length}`
    );
  } catch (err) {
    record("Persistent Upload", "Photo Upload & Persistence", false, err.message);
  }

  // 8. Persistent File Upload & Retrieval Test (Landlord ID Document)
  try {
    let landlordUser = await db.collection("user").findOne({ role: "landlord" });
    if (!landlordUser) {
      landlordUser = await db.collection("user").findOne({ email: "johhn9293@gmail.com" });
    }
    const landlordCookie = await createSignedSessionCookie(db, landlordUser);

    const docForm = new FormData();
    const samplePdfBuffer = Buffer.from("%PDF-1.4\n%Test Landlord ID Government Verification Document\n%%EOF");
    const docBlob = new Blob([samplePdfBuffer], { type: "application/pdf" });
    docForm.append("governmentId", docBlob, "government_id.pdf");

    const uploadDocRes = await request("/api/verification/landlord-id", {
      method: "POST",
      headers: { Cookie: landlordCookie },
      body: docForm,
    });

    const docUrl = uploadDocRes.data?.documentUrl || "";
    record(
      "Persistent Upload",
      "POST /api/verification/landlord-id (Multipart ID Document Upload)",
      uploadDocRes.status === 200 && Boolean(docUrl),
      `Status: ${uploadDocRes.status}, Body: ${JSON.stringify(uploadDocRes.data)}, Stored URL: ${docUrl}`
    );

    // Retrieve ID document as the owner
    const fetchDocRes = await request(docUrl, {
      headers: { Cookie: landlordCookie },
    });
    const docContentType = fetchDocRes.headers.get("content-type") || "";
    record(
      "Persistent Upload",
      `GET ${docUrl} (Authorized Retrieval by Owner)`,
      fetchDocRes.status === 200 && docContentType.includes("application/pdf"),
      `Status: ${fetchDocRes.status}, Content-Type: ${docContentType}, Bytes: ${fetchDocRes.data?.length}`
    );

    // Verify unauthorized access is blocked
    const unauthFetch = await request(docUrl);
    record(
      "Persistent Upload",
      `GET ${docUrl} (Security Check: Reject Unauthenticated Requests)`,
      unauthFetch.status === 401,
      `Status: ${unauthFetch.status} (Protected)`
    );
  } catch (err) {
    record("Persistent Upload", "Landlord ID Document Persistence", false, err.message);
  }

  // 9. Matching Engine
  try {
    const matchRes = await request("/api/match/request", {
      method: "POST",
      headers: { Cookie: seekerCookie },
      body: { forceRecompute: true },
    });
    record(
      "Matching Engine",
      "POST /api/match/request (Scoring & Candidate Pool)",
      (matchRes.status === 200 || matchRes.status === 201) && Boolean(matchRes.data?.matchRequest),
      `Status: ${matchRes.status}, Matches Generated: ${matchRes.data?.matchRequest?.matches?.length ?? 0}`
    );
  } catch (err) {
    record("Matching Engine", "POST /api/match/request", false, err.message);
  }

  // 10. Chat & Polling
  try {
    const chatListRes = await request("/api/chat/list", {
      headers: { Cookie: seekerCookie },
    });
    const chats = chatListRes.data?.chats || [];
    record(
      "Chat",
      "GET /api/chat/list (HTTP Polling)",
      chatListRes.status === 200 && Array.isArray(chats),
      `Status: ${chatListRes.status}, Chats Found: ${chats.length}`
    );

    if (chats.length > 0) {
      const chatId = chats[0]._id;
      const messagesRes = await request(`/api/chat/${chatId}/messages`, {
        headers: { Cookie: seekerCookie },
      });
      record(
        "Chat",
        `GET /api/chat/${chatId}/messages (HTTP Polling)`,
        messagesRes.status === 200 && Array.isArray(messagesRes.data?.messages),
        `Status: ${messagesRes.status}, Messages: ${messagesRes.data?.messages?.length}`
      );
    }
  } catch (err) {
    record("Chat", "GET /api/chat/list", false, err.message);
  }

  // 11. Admin Dashboard & AI Moderation Suggestion
  try {
    const adminUser = await db.collection("user").findOne({ email: "naitiksaraf2507@gmail.com" });
    const adminCookie = await createSignedSessionCookie(db, adminUser);

    const adminReportsRes = await request("/api/admin/reports", {
      headers: { Cookie: adminCookie },
    });
    const reports = adminReportsRes.data?.reports || [];
    record(
      "Admin",
      "GET /api/admin/reports (Access Control & Retrieval)",
      adminReportsRes.status === 200 && Array.isArray(reports),
      `Status: ${adminReportsRes.status}, Reports: ${reports.length}`
    );

    if (reports.length > 0) {
      const reportId = reports[0]._id;
      const aiSuggestRes = await request(`/api/admin/reports/${reportId}/ai-suggest`, {
        method: "POST",
        headers: { Cookie: adminCookie },
      });
      const hasValidOutcome =
        aiSuggestRes.status === 200 &&
        (aiSuggestRes.data?.available === true
          ? Boolean(aiSuggestRes.data?.suggestion?.action)
          : aiSuggestRes.data?.available === false);

      record(
        "Admin AI Moderation",
        `POST /api/admin/reports/${reportId}/ai-suggest (Gemini Moderation)`,
        hasValidOutcome,
        `Status: ${aiSuggestRes.status}, Available: ${aiSuggestRes.data?.available}, Action/Msg: "${aiSuggestRes.data?.suggestion?.action || aiSuggestRes.data?.message}"`
      );
    }
  } catch (err) {
    record("Admin", "Admin Dashboard & AI", false, err.message);
  }

  console.log("\n=================================================");
  const allPassed = results.every(r => r.passed);
  console.log(`SUMMARY: ${results.filter(r => r.passed).length}/${results.length} PASSED`);
  console.log(`OVERALL STATUS: ${allPassed ? "SUCCESS (ALL TESTS PASSED)" : "SOME TESTS FAILED"}`);
  console.log("=================================================");
  process.exit(allPassed ? 0 : 1);
}

runTests();
