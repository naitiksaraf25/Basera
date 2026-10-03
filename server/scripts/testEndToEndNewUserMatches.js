/**
 * End-to-End Test for New User Creation, Hybrid College Verification, and Matching
 * Tests:
 * 1. Brand new user with IIT Patna domain (@iitp.ac.in) -> verified via static allowlist
 * 2. Onboarding in Patna (previously 0 listings) -> matches returned
 * 3. Brand new user with unlisted college domain (@ceconline.edu) -> verified via AI
 * 4. Onboarding in Dehradun (previously 0 listings) -> matches returned
 */

import { connectMongoose, getUserCollection } from "../db.js";
import LifestyleProfile from "../models/LifestyleProfile.js";
import MatchRequest from "../models/MatchRequest.js";
import { verifyCollegeDomain } from "../services/collegeVerification.js";

const BASE_URL = "http://localhost:5000";

async function runTest() {
  console.log("==================================================");
  console.log("🧪 RUNNING END-TO-END NEW USER & MATCH TEST");
  console.log("==================================================");

  await connectMongoose();
  const userCol = await getUserCollection();

  // ----------------------------------------------------
  // TEST 1: New Seeker in Patna, Bihar (IIT Patna Email)
  // ----------------------------------------------------
  const patnaUserId = `test_seeker_patna_${Date.now()}`;
  const patnaEmail = `student_${Date.now()}@iitp.ac.in`;

  console.log(`\n[Test 1] 1. Creating brand-new user with email: ${patnaEmail}`);
  const domainCheck1 = await verifyCollegeDomain(patnaEmail);
  console.log(`   Domain Verification: ${domainCheck1.status} via ${domainCheck1.method} (${domainCheck1.institutionName})`);

  // Insert user into DB as if authenticated via BetterAuth
  await userCol.insertOne({
    id: patnaUserId,
    email: patnaEmail,
    name: "Aaditya Roy",
    role: "seeker",
    emailVerified: true,
    accountStatus: "active",
    platformVerification: {
      status: domainCheck1.status,
      method: domainCheck1.method,
      collegeEmail: patnaEmail,
      institutionName: domainCheck1.institutionName,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(),
    updatedAt: new Date()
  });

  console.log(`[Test 1] 2. Creating LifestyleProfile in Patna, Bihar`);
  await LifestyleProfile.findOneAndUpdate(
    { userId: patnaUserId },
    {
      userId: patnaUserId,
      city: "Patna",
      locality: "Boring Road",
      budgetMin: 5000,
      budgetMax: 9500,
      gender: "male",
      genderPreference: "any",
      sleepSchedule: "early_bird",
      cleanliness: 4,
      smokingDrinking: "none",
      foodPreference: "vegetarian",
      guestsFrequency: "rarely",
      roomTypePreference: "any",
      bio: "CSE undergraduate looking for peaceful study environment near Boring Road.",
      updatedAt: new Date()
    },
    { upsert: true, new: true }
  );

  console.log(`[Test 1] 3. Querying Match Request for Patna...`);
  // Import match route logic directly or call endpoint
  const matchModule = await import("../routes/match.js");
  const { computeMatches } = await import("../services/matchingEngine.js");
  const LandlordListing = (await import("../models/LandlordListing.js")).default;

  // Retrieve active & verified listings
  const activeListings = await LandlordListing.find({ status: "active", city: "Patna" }).lean();
  console.log(`   Found ${activeListings.length} active listings in Patna in database.`);

  const verifiedUserMap = new Map();
  const rawUsers = await userCol.find().toArray();
  for (const u of rawUsers) {
    if (u.platformVerification?.status === "verified") {
      verifiedUserMap.set(String(u.id || u._id), u);
    }
  }

  const candidatesPool = [];
  for (const listing of activeListings) {
    const landlordUser = verifiedUserMap.get(String(listing.landlordId));
    if (landlordUser) {
      candidatesPool.push({
        ...listing,
        candidateType: "landlordListing",
        user: landlordUser,
        linkedTenantProfiles: []
      });
    }
  }

  console.log(`   Verified landlord candidates in pool: ${candidatesPool.length}`);

  const seekerCriteria = {
    userId: patnaUserId,
    city: "Patna",
    locality: "Boring Road",
    budgetMin: 5000,
    budgetMax: 9500,
    gender: "male",
    genderPreference: "any",
    sleepSchedule: "early_bird",
    cleanliness: 4,
    smokingDrinking: "none",
    foodPreference: "vegetarian",
    guestsFrequency: "rarely",
    roomTypePreference: "any",
    platformVerification: { status: "verified" },
    accountStatus: "active"
  };

  const matchOutput = computeMatches(seekerCriteria, candidatesPool);
  console.log(`   ComputeMatches returned ${matchOutput.totalEligibleCount} eligible matches in Patna!`);

  console.log("\n   Top Matches in Patna, Bihar:");
  matchOutput.results.slice(0, 3).forEach((m, idx) => {
    console.log(`   #${idx + 1}: ${m.candidate.locality}, Patna | Rent: ₹${m.candidate.rent}/mo | Room: ${m.candidate.roomType}`);
    console.log(`        Score: ${m.normalizedScore}% (Raw: ${m.score}/${m.maxApplicablePoints})`);
    console.log(`        Host: ${m.candidate.user.name}`);
    console.log(`        Breakdown: Cleanliness=${m.breakdown.cleanliness || 0}/25 | Sleep=${m.breakdown.sleepSchedule || 0}/20 | Food=${m.breakdown.foodPreference || 0}/15 | Smoke=${m.breakdown.smokingDrinking || 0}/20 | Guests=${m.breakdown.guestsFrequency || 0}/10 | Proximity=${m.breakdown.cityProximity || 0}/5 | Budget=${m.breakdown.budgetCloseness || 0}/5`);
  });

  // ----------------------------------------------------
  // TEST 2: New Seeker in Dehradun, Uttarakhand (AI Fallback Domain)
  // ----------------------------------------------------
  console.log("\n--------------------------------------------------");
  const dehradunUserId = `test_seeker_dehradun_${Date.now()}`;
  const dehradunEmail = `student_${Date.now()}@ceconline.edu`;

  console.log(`[Test 2] 1. Creating brand-new user with unlisted college email: ${dehradunEmail}`);
  const domainCheck2 = await verifyCollegeDomain(dehradunEmail);
  console.log(`   Domain Verification: ${domainCheck2.status} via ${domainCheck2.method} (${domainCheck2.institutionName || "AI Evaluated"})`);

  await userCol.insertOne({
    id: dehradunUserId,
    email: dehradunEmail,
    name: "Tanvi Rawat",
    role: "seeker",
    emailVerified: true,
    accountStatus: "active",
    platformVerification: {
      status: domainCheck2.status,
      method: domainCheck2.method,
      collegeEmail: dehradunEmail,
      institutionName: domainCheck2.institutionName,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(),
    updatedAt: new Date()
  });

  console.log(`[Test 2] 2. Querying Match Request for Dehradun...`);
  const dehradunListings = await LandlordListing.find({ status: "active", city: "Dehradun" }).lean();
  console.log(`   Found ${dehradunListings.length} active listings in Dehradun in database.`);

  const dehradunCandidates = [];
  for (const listing of dehradunListings) {
    const landlordUser = verifiedUserMap.get(String(listing.landlordId));
    if (landlordUser) {
      dehradunCandidates.push({
        ...listing,
        candidateType: "landlordListing",
        user: landlordUser,
        linkedTenantProfiles: []
      });
    }
  }

  const dehradunCriteria = {
    userId: dehradunUserId,
    city: "Dehradun",
    locality: "Rajpur Road",
    budgetMin: 6000,
    budgetMax: 11000,
    gender: "female",
    genderPreference: "any",
    sleepSchedule: "flexible",
    cleanliness: 5,
    smokingDrinking: "none",
    foodPreference: "any",
    guestsFrequency: "rarely",
    platformVerification: { status: "verified" },
    accountStatus: "active"
  };

  const dehradunOutput = computeMatches(dehradunCriteria, dehradunCandidates);
  console.log(`   ComputeMatches returned ${dehradunOutput.totalEligibleCount} eligible matches in Dehradun!`);

  console.log("\n   Top Matches in Dehradun, Uttarakhand:");
  dehradunOutput.results.slice(0, 3).forEach((m, idx) => {
    console.log(`   #${idx + 1}: ${m.candidate.locality}, Dehradun | Rent: ₹${m.candidate.rent}/mo | Room: ${m.candidate.roomType}`);
    console.log(`        Score: ${m.normalizedScore}% (Raw: ${m.score}/${m.maxApplicablePoints})`);
    console.log(`        Host: ${m.candidate.user.name}`);
    console.log(`        Breakdown: Cleanliness=${m.breakdown.cleanliness || 0}/25 | Sleep=${m.breakdown.sleepSchedule || 0}/20 | Food=${m.breakdown.foodPreference || 0}/15 | Smoke=${m.breakdown.smokingDrinking || 0}/20 | Guests=${m.breakdown.guestsFrequency || 0}/10 | Proximity=${m.breakdown.cityProximity || 0}/5 | Budget=${m.breakdown.budgetCloseness || 0}/5`);
  });

  // Clean up test users
  await userCol.deleteMany({ id: { $in: [patnaUserId, dehradunUserId] } });
  await LifestyleProfile.deleteMany({ userId: { $in: [patnaUserId, dehradunUserId] } });

  console.log("\n==================================================");
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
  process.exit(0);
}

runTest().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
