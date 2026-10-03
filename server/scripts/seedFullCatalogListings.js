/**
 * Database Seeding Script: Full Indian Educational Catalog
 * Seeds at least 10 verified landlord listings per state across all 18 states
 * (covering all 36 Tier-1 and Tier-2 education clusters).
 *
 * Guarantees every new user, regardless of city or state selected during onboarding,
 * receives high-confidence, verified lifestyle matches.
 */

import { connectMongoose, getUserCollection, getMongoClientAndDb } from "../db.js";
import LandlordListing from "../models/LandlordListing.js";
import LifestyleProfile from "../models/LifestyleProfile.js";
import { CITY_CATALOG, STATE_CITY_MAP } from "../../client/src/data/cityData.js";

// Curated verified room photography
const SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
];

const LANDLORD_FIRST_NAMES = [
  "Ramesh", "Suresh", "Rajesh", "Vikram", "Anand", "Sunita", "Meenakshi", "Pooja",
  "Kavita", "Sanjay", "Manoj", "Arun", "Deepak", "Amit", "Prakash", "Sanjay",
  "Pradeep", "Alok", "Naveen", "Gautam", "Mohan", "Lakshmi", "Rekha", "Shalini"
];

const LANDLORD_LAST_NAMES = [
  "Sharma", "Verma", "Mehta", "Patel", "Reddy", "Iyer", "Nair", "Kulkarni",
  "Deshmukh", "Agarwal", "Gupta", "Joshi", "Choudhury", "Bose", "Banerjee",
  "Rathore", "Saxena", "Mishra", "Pandey", "Singhania", "Mukherjee", "Das"
];

const ROOM_TYPES = ["private_room", "shared_room", "pg_bed", "full_flat"];
const GENDER_PREFS = ["any", "any", "male_only", "female_only"];
const GUEST_POLICIES = ["daytime_only", "flexible", "daytime_only", "overnight_allowed"];
const CURFEWS = ["no_curfew", "no_curfew", "10_pm", "11_pm"];

export async function seedAllStatesMockListings() {
  console.log("==================================================");
  console.log("🌱 STARTING FULL INDIAN CATALOG SEEDING");
  console.log("==================================================");

  await connectMongoose();
  const userCol = await getUserCollection();

  // 1. Clean previous automated mock listings and landlords
  console.log("Cleaning previous mock entries...");
  const deleteListingsResult = await LandlordListing.deleteMany({
    landlordId: { $regex: /^mock_landlord_/ }
  });
  const deleteUsersResult = await userCol.deleteMany({
    id: { $regex: /^mock_landlord_/ }
  });
  console.log(`Deleted ${deleteListingsResult.deletedCount} old mock listings and ${deleteUsersResult.deletedCount} old mock landlords.`);

  let totalListingsCreated = 0;
  let totalLandlordsCreated = 0;
  const stateSummary = {};

  const stateEntries = Object.entries(STATE_CITY_MAP);

  for (const [stateName, citySlugs] of stateEntries) {
    stateSummary[stateName] = 0;

    // Distribute at least 10 listings across the cities of this state
    const targetPerState = 10;
    const basePerCity = Math.max(2, Math.ceil(targetPerState / citySlugs.length));

    for (let cIdx = 0; cIdx < citySlugs.length; cIdx++) {
      const citySlug = citySlugs[cIdx];
      const cityInfo = CITY_CATALOG[citySlug] || {
        name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
        slug: citySlug,
        areas: [{ name: "University Campus Road" }, { name: "Scholars Enclave" }]
      };

      const cityName = cityInfo.name;
      const areas = Array.isArray(cityInfo.areas) && cityInfo.areas.length > 0
        ? cityInfo.areas.map(a => a.name)
        : ["University Hub", "College Road", "North Campus", "Tech Zone"];

      // For Tier-1 hubs or single-city states, seed at least 10 listings in that city alone
      const countForThisCity = citySlugs.length === 1 ? targetPerState : basePerCity;

      for (let i = 0; i < countForThisCity; i++) {
        const landlordId = `mock_landlord_${citySlug}_${i + 1}`;
        const fName = LANDLORD_FIRST_NAMES[(totalListingsCreated + i) % LANDLORD_FIRST_NAMES.length];
        const lName = LANDLORD_LAST_NAMES[(totalListingsCreated + i * 2) % LANDLORD_LAST_NAMES.length];
        const landlordName = `${fName} ${lName} (${cityName} Host)`;
        const email = `host_${citySlug}_${i + 1}@basera-hosts.in`;

        // 1. Create Verified Landlord User
        await userCol.updateOne(
          { id: landlordId },
          {
            $set: {
              id: landlordId,
              name: landlordName,
              email,
              role: "landlord",
              emailVerified: true,
              accountStatus: "active",
              platformVerification: {
                status: "verified",
                method: "government_id",
                verifiedAt: new Date().toISOString(),
                idDocumentUrl: "/mock-docs/verified-landlord.pdf"
              },
              createdAt: new Date(),
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        totalLandlordsCreated++;

        // 2. Select Locality & Details
        const locality = areas[i % areas.length];
        const roomType = ROOM_TYPES[i % ROOM_TYPES.length];
        const genderPreference = GENDER_PREFS[i % GENDER_PREFS.length];
        const guestPolicy = GUEST_POLICIES[i % GUEST_POLICIES.length];
        const curfew = CURFEWS[i % CURFEWS.length];
        const rent = 5200 + ((i * 1150 + totalListingsCreated * 170) % 7800); // Between ₹5,200 and ₹13,000

        const photo1 = SAMPLE_PHOTOS[(totalListingsCreated + i) % SAMPLE_PHOTOS.length];
        const photo2 = SAMPLE_PHOTOS[(totalListingsCreated + i + 1) % SAMPLE_PHOTOS.length];

        const cleanliness = (i % 2 === 0) ? 4 : 5;
        const foodPreference = (i % 3 === 0) ? "vegetarian" : "any";
        const sleepSchedule = (curfew === "10_pm" || curfew === "11_pm") ? "early_bird" : "flexible";

        // 3. Create LandlordListing
        const listingDoc = new LandlordListing({
          landlordId,
          city: cityName,
          locality,
          rent,
          roomType,
          genderPreference,
          cleanliness,
          foodPreference,
          sleepSchedule,
          houseRules: {
            smokingAllowed: false,
            drinkingAllowed: false,
            petsAllowed: i % 4 === 0,
            guestPolicy,
            curfew
          },
          photoUrls: [photo1, photo2],
          status: "active",
          createdAt: new Date()
        });

        await listingDoc.save();
        totalListingsCreated++;
        stateSummary[stateName] = (stateSummary[stateName] || 0) + 1;
      }
    }
  }

  console.log("==================================================");
  console.log("✅ SEEDING COMPLETE!");
  console.log(`Total Landlord Accounts Created: ${totalLandlordsCreated}`);
  console.log(`Total Active Listings Created: ${totalListingsCreated}`);
  console.log("State-wise Distribution:");
  for (const [st, cnt] of Object.entries(stateSummary)) {
    console.log(`- ${st}: ${cnt} listings`);
  }
  console.log("==================================================");

  return { totalListingsCreated, totalLandlordsCreated, stateSummary };
}

// Auto-run when executed directly via node
if (process.argv[1]?.endsWith("seedFullCatalogListings.js")) {
  seedAllStatesMockListings()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seeding error:", err);
      process.exit(1);
    });
}
