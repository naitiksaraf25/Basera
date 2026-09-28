import { app } from "./app.js";
import { connectMongoose } from "./db.js";

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Connect to MongoDB
connectMongoose()
  .then(() => {
    console.log(`[Database] Successfully connected to MongoDB`);
  })
  .catch((err) => {
    console.error(`[Database Error] Connection failed: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`[Server] Server starting on http://localhost:${PORT}`);
  console.log(`[Server] Restricted CORS allowed origin: ${CLIENT_URL}`);
  console.log(`[Auth] BetterAuth endpoints mounted at /api/auth/*`);
  console.log(`[Onboarding] Onboarding endpoints mounted at /api/onboarding/*`);
  console.log(`[Verification] Verification endpoints mounted at /api/verification/*`);
  console.log(`[Profile] Lifestyle profile & landlord listing endpoints mounted at /api/profile/*`);
  console.log(`[Documents] Protected document endpoints mounted at /api/documents/*`);
  console.log(`[Photos] Public photo endpoints mounted at /api/photos/*`);
  console.log(`[Report] User report endpoints mounted at /api/report/*`);
  console.log(`[Admin] Admin dashboard & promotion endpoints mounted at /api/admin/*`);
});
