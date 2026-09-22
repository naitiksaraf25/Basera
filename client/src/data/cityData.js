// City Data Catalog for Basera
// Authentic Indian Student Hubs & Localities with verified HTTP 200 high-res photography
// Tier 1: 10 Full-depth major hubs with 6-8 listings across all localities
// Tier 2: 26 University & coaching clusters with 2-3 sample listings across localities
// State-wise mapping for all 36 cities

export const CITY_CATALOG = {
  "bengaluru": {
    "name": "Bengaluru",
    "slug": "bengaluru",
    "tier": 1,
    "state": "Karnataka",
    "tagline": "India's Silicon Valley & Premier Student Innovation Hub",
    "totalRoomsText": "1,340+ verified rooms in Bengaluru",
    "roomCountNumber": 1340,
    "startPrice": "₹7,200",
    "description": "Home to Christ University, IISc, NIFT, and top tech parks. Explore verified, zero-brokerage student flats and co-living spaces across Koramangala, HSR, and Indiranagar.",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Koramangala • HSR Layout • Electronic City • Indiranagar",
    "universities": [
      "Christ University (Main & BGR)",
      "IISc Bengaluru",
      "PES University",
      "NIFT Bengaluru",
      "St. Joseph's University"
    ],
    "areas": [
      {
        "id": "koramangala",
        "name": "Koramangala",
        "subtext": "Christ University • Startup Hub",
        "roomCount": "480+ rooms",
        "startPrice": "₹9,500/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "hsr-layout",
        "name": "HSR Layout",
        "subtext": "NIFT • Tech Corridors • Tree-lined Sectors",
        "roomCount": "340+ rooms",
        "startPrice": "₹8,800/mo",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "indiranagar",
        "name": "Indiranagar",
        "subtext": "Purple Metro Line • 100ft Road • Cafes",
        "roomCount": "260+ rooms",
        "startPrice": "₹11,000/mo",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "electronic-city",
        "name": "Electronic City",
        "subtext": "PES South • Tech Innovation Corridor",
        "roomCount": "260+ rooms",
        "startPrice": "₹7,200/mo",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "blr-1",
        "title": "Indiranagar Urban Living Studio",
        "locality": "Indiranagar, Near 100ft Road",
        "distance": "400m from CMH Road Metro Station",
        "price": 11000,
        "rating": 4.8,
        "reviewsCount": 68,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Attached Washroom",
          "Cook on Request",
          "No Lock-in"
        ]
      },
      {
        "id": "blr-2",
        "title": "Koramangala 5th Block Scholar PG",
        "locality": "Koramangala, 5th Block",
        "distance": "600m from Christ University Main Gate",
        "price": 9500,
        "rating": 4.9,
        "reviewsCount": 54,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Wi-Fi 200Mbps",
          "Power Backup",
          "North/South Meals",
          "Daily Housekeeping"
        ]
      },
      {
        "id": "blr-3",
        "title": "HSR Sector 2 Co-Living Suite",
        "locality": "HSR Layout, Sector 2",
        "distance": "1.1 km from NIFT Campus",
        "price": 8800,
        "rating": 4.7,
        "reviewsCount": 42,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Kitchen Access",
          "Laundry Area",
          "Security Guard"
        ]
      },
      {
        "id": "blr-4",
        "title": "Electronic City Tech Scholar PG",
        "locality": "Electronic City, Phase 1",
        "distance": "500m from PES South Campus",
        "price": 7200,
        "rating": 4.8,
        "reviewsCount": 39,
        "roomType": "Triple Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-Speed Wi-Fi",
          "3-Time Meals",
          "Power Backup",
          "Biometric Entry"
        ]
      },
      {
        "id": "blr-5",
        "title": "Koramangala 4th Block Designer 1BHK",
        "locality": "Koramangala, 4th Block",
        "distance": "800m from Sony World Signal",
        "price": 15500,
        "rating": 4.9,
        "reviewsCount": 47,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished Living",
          "Modular Kitchen",
          "Attached Balcony",
          "Zero Brokerage"
        ]
      },
      {
        "id": "blr-6",
        "title": "HSR Sector 4 Tree-lined Twin Room",
        "locality": "HSR Layout, Sector 4",
        "distance": "700m from BDA Complex",
        "price": 9200,
        "rating": 4.7,
        "reviewsCount": 31,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Daily Cleaning",
          "Purified RO Water",
          "Study Desk",
          "CCTV Security"
        ]
      },
      {
        "id": "blr-7",
        "title": "Indiranagar 12th Main Penthouse Room",
        "locality": "Indiranagar, Near 12th Main",
        "distance": "350m from Metro Station",
        "price": 13500,
        "rating": 4.9,
        "reviewsCount": 28,
        "roomType": "Private Room in 3BHK",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Air Conditioned",
          "Terrace Garden Access",
          "High Speed Wi-Fi",
          "Fully Equipped Kitchen"
        ]
      }
    ]
  },
  "delhi-ncr": {
    "name": "Delhi NCR",
    "slug": "delhi-ncr",
    "tier": 1,
    "state": "Delhi NCR",
    "tagline": "India's Capital Academic Hub & University Corridor",
    "totalRoomsText": "1,520+ verified rooms in Delhi NCR",
    "roomCountNumber": 1520,
    "startPrice": "₹6,000",
    "description": "Home to Delhi University North & South Campus, IIT Delhi, JNU, and Noida Knowledge Corridor. Verified student accommodations near metro stations.",
    "image": "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=80",
    "hubs": "North Campus • South Campus • Noida Sector 62 • Hauz Khas",
    "universities": [
      "Delhi University (DU)",
      "IIT Delhi",
      "Jawaharlal Nehru University",
      "Amity University Noida",
      "DTU"
    ],
    "areas": [
      {
        "id": "north-campus",
        "name": "North Campus",
        "subtext": "DU Arts & Science Colleges • Hudson Lane",
        "roomCount": "580+ rooms",
        "startPrice": "₹7,500/mo",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "south-campus",
        "name": "South Campus",
        "subtext": "Satya Niketan • Venkateswara & LSR",
        "roomCount": "420+ rooms",
        "startPrice": "₹8,000/mo",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "noida-sec62",
        "name": "Noida Sector 62",
        "subtext": "JIIT • Tech Institutions • Blue Line Metro",
        "roomCount": "310+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "hauz-khas",
        "name": "Hauz Khas / IIT",
        "subtext": "IIT Delhi • NIFT • Yellow & Magenta Metro",
        "roomCount": "210+ rooms",
        "startPrice": "₹10,500/mo",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "del-1",
        "title": "Greenwood Residency — Double Suite",
        "locality": "North Campus, Hudson Lane",
        "distance": "400m from GTB Nagar Metro",
        "price": 8500,
        "rating": 4.9,
        "reviewsCount": 76,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Wi-Fi 100Mbps",
          "AC",
          "Daily Housekeeping",
          "3-Time Meals"
        ]
      },
      {
        "id": "del-2",
        "title": "Satya Niketan Scholar Studio",
        "locality": "South Campus, Satya Niketan",
        "distance": "200m from Durgabai Deshmukh South Campus Metro",
        "price": 11000,
        "rating": 4.8,
        "reviewsCount": 48,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "Attached Bathroom",
          "High Speed Wi-Fi",
          "Zero Brokerage"
        ]
      },
      {
        "id": "del-3",
        "title": "Kamla Nagar Premier Girls PG",
        "locality": "North Campus, Kamla Nagar Market",
        "distance": "500m from Hansraj & Kirori Mal Colleges",
        "price": 9000,
        "rating": 4.8,
        "reviewsCount": 55,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Biometric Security",
          "Nutritious Meals",
          "Study Lounge",
          "Full Power Backup"
        ]
      },
      {
        "id": "del-4",
        "title": "Noida Sector 62 Tech Park PG",
        "locality": "Noida Sector 62, Near JIIT",
        "distance": "300m from JIIT Main Campus",
        "price": 6500,
        "rating": 4.7,
        "reviewsCount": 41,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Metro Shuttle",
          "High Speed Wi-Fi",
          "Laundry Service"
        ]
      },
      {
        "id": "del-5",
        "title": "Hauz Khas IIT Gate Studio",
        "locality": "Hauz Khas, Near IIT Delhi Gate 1",
        "distance": "350m from IIT Delhi",
        "price": 14000,
        "rating": 4.9,
        "reviewsCount": 37,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 97,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Designer Furnished",
          "Kitchenette",
          "Gym Access",
          "Quiet Study Zone"
        ]
      },
      {
        "id": "del-6",
        "title": "Satya Niketan Venkateswara Walk PG",
        "locality": "South Campus, Satya Niketan Benito Juarez Marg",
        "distance": "150m from Sri Venkateswara College",
        "price": 8200,
        "rating": 4.7,
        "reviewsCount": 34,
        "roomType": "Triple Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "All Meals Included",
          "Wi-Fi 150Mbps",
          "Power Backup",
          "Rooftop Common Room"
        ]
      },
      {
        "id": "del-7",
        "title": "Noida Sector 62 Modern 1BHK Student Flat",
        "locality": "Noida Sector 62, Near Electronic City Metro",
        "distance": "400m from Metro Station",
        "price": 12500,
        "rating": 4.8,
        "reviewsCount": 29,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Gated Society",
          "Clubhouse",
          "24/7 Security",
          "Zero Lock-in"
        ]
      }
    ]
  },
  "pune": {
    "name": "Pune",
    "slug": "pune",
    "tier": 1,
    "state": "Maharashtra",
    "tagline": "Oxford of the East & Vibrant College Culture",
    "totalRoomsText": "1,120+ verified rooms in Pune",
    "roomCountNumber": 1120,
    "startPrice": "₹5,500",
    "description": "Home to COEP, Symbiosis, Fergusson College, MIT-WPU, and Hinjewadi Tech Park. Tree-lined avenues, student cafes, and quiet study spaces.",
    "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Kothrud • Viman Nagar • FC Road • Hinjewadi",
    "universities": [
      "COEP Tech University",
      "Symbiosis International",
      "Fergusson College",
      "MIT World Peace University",
      "SPPU"
    ],
    "areas": [
      {
        "id": "kothrud",
        "name": "Kothrud",
        "subtext": "MIT-WPU • Vanaz Metro • Student Hub",
        "roomCount": "380+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "viman-nagar",
        "name": "Viman Nagar",
        "subtext": "Symbiosis Campus • Cafes & Malls",
        "roomCount": "340+ rooms",
        "startPrice": "₹8,500/mo",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fc-road",
        "name": "FC Road & Shivaji Nagar",
        "subtext": "Fergusson • COEP • Central Pune",
        "roomCount": "240+ rooms",
        "startPrice": "₹7,200/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "hinjewadi",
        "name": "Hinjewadi IT Corridor",
        "subtext": "Internships • Modern Gated Co-Living",
        "roomCount": "160+ rooms",
        "startPrice": "₹6,500/mo",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "pun-1",
        "title": "Kothrud Student Abode — Twin Share",
        "locality": "Kothrud, Near MIT World Peace Univ",
        "distance": "300m from MIT Main Gate",
        "price": 6800,
        "rating": 4.8,
        "reviewsCount": 52,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Wi-Fi 100Mbps",
          "Cook Included",
          "Study Desk",
          "No Curfew"
        ]
      },
      {
        "id": "pun-2",
        "title": "Viman Nagar Studio Apartment",
        "locality": "Viman Nagar, Near Symbiosis",
        "distance": "500m from Symbiosis Law School",
        "price": 12000,
        "rating": 4.9,
        "reviewsCount": 38,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Kitchenette",
          "Gym Access",
          "Power Backup"
        ]
      },
      {
        "id": "pun-3",
        "title": "FC Road Heritage Scholar PG",
        "locality": "FC Road, Near Fergusson College",
        "distance": "200m from Fergusson Main Gate",
        "price": 7500,
        "rating": 4.9,
        "reviewsCount": 64,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Pure Veg Meals",
          "Quiet Study Hall",
          "Wi-Fi 100Mbps",
          "Daily Cleaning"
        ]
      },
      {
        "id": "pun-4",
        "title": "Hinjewadi Phase 1 Co-Living Suite",
        "locality": "Hinjewadi, Phase 1 Near Tech Hubs",
        "distance": "800m from Infosys Circle",
        "price": 7200,
        "rating": 4.7,
        "reviewsCount": 33,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Daily Housekeeping",
          "Cafeteria",
          "Gym & Pool"
        ]
      },
      {
        "id": "pun-5",
        "title": "Shivaji Nagar COEP Walk Flatmate Room",
        "locality": "Shivaji Nagar, Near COEP Campus",
        "distance": "400m from COEP Hostel Gate",
        "price": 9500,
        "rating": 4.8,
        "reviewsCount": 41,
        "roomType": "Single Room in 2BHK",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Washroom",
          "High Speed Wi-Fi",
          "Cook on Demand",
          "Zero Brokerage"
        ]
      },
      {
        "id": "pun-6",
        "title": "Kothrud Vanaz Metro Modern 1BHK",
        "locality": "Kothrud, Near Vanaz Metro Station",
        "distance": "300m from Vanaz Metro",
        "price": 13000,
        "rating": 4.8,
        "reviewsCount": 26,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "Balcony Garden",
          "Piped Gas",
          "Lift & Parking"
        ]
      },
      {
        "id": "pun-7",
        "title": "Viman Nagar Dutta Mandir Girls PG",
        "locality": "Viman Nagar, Dutta Mandir Chowk",
        "distance": "600m from Symbiosis Campus",
        "price": 8900,
        "rating": 4.9,
        "reviewsCount": 45,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 97,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "24/7 Female Warden",
          "Home-style Maharashtrian & North Food",
          "Wi-Fi",
          "CCTV"
        ]
      }
    ]
  },
  "mumbai": {
    "name": "Mumbai",
    "slug": "mumbai",
    "tier": 1,
    "state": "Maharashtra",
    "tagline": "India's Financial Capital & Coastal Higher-Ed Hub",
    "totalRoomsText": "890+ verified rooms in Mumbai",
    "roomCountNumber": 890,
    "startPrice": "₹9,500",
    "description": "Home to IIT Bombay, St. Xavier's, NMIMS, and TISS. Verified zero-brokerage student housing across Powai, Vile Parle, Bandra, and Chembur.",
    "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "hubs": "Powai • Vile Parle • Bandra West • Chembur",
    "universities": [
      "IIT Bombay",
      "NMIMS Mumbai",
      "St. Xavier's College",
      "TISS Mumbai",
      "H.R. College of Commerce"
    ],
    "areas": [
      {
        "id": "powai",
        "name": "Powai",
        "subtext": "IIT Bombay • Hiranandani Student Zone",
        "roomCount": "320+ rooms",
        "startPrice": "₹12,000/mo",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "vile-parle",
        "name": "Vile Parle West",
        "subtext": "NMIMS • Mithibai • SVKM Hub",
        "roomCount": "290+ rooms",
        "startPrice": "₹14,000/mo",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "bandra-west",
        "name": "Bandra West",
        "subtext": "National College • Sea Breeze",
        "roomCount": "160+ rooms",
        "startPrice": "₹16,500/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "chembur",
        "name": "Chembur",
        "subtext": "TISS • Eastern Suburbs Transit",
        "roomCount": "120+ rooms",
        "startPrice": "₹9,500/mo",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "mum-1",
        "title": "Powai Tech Park Living — Double Suite",
        "locality": "Powai, Near IIT Bombay Market Gate",
        "distance": "600m from IIT Bombay Campus",
        "price": 13500,
        "rating": 4.9,
        "reviewsCount": 62,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "AC Included",
          "Daily Housekeeping",
          "Power Backup"
        ]
      },
      {
        "id": "mum-2",
        "title": "Hiranandani Gardens Executive Studio",
        "locality": "Powai, Hiranandani Gardens",
        "distance": "1 km from IIT Bombay Main Gate",
        "price": 21000,
        "rating": 4.8,
        "reviewsCount": 39,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Designer Interiors",
          "Modular Kitchen",
          "Gym Access",
          "24/7 Security"
        ]
      },
      {
        "id": "mum-3",
        "title": "Vile Parle NMIMS Premium Scholar PG",
        "locality": "Vile Parle West, Near Mithibai",
        "distance": "350m from NMIMS Campus",
        "price": 15500,
        "rating": 4.9,
        "reviewsCount": 54,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Pure Veg Meals",
          "Daily Cleaning",
          "Study Desk"
        ]
      },
      {
        "id": "mum-4",
        "title": "SVKM Transit Studio Flat",
        "locality": "Vile Parle West, JVPD Scheme",
        "distance": "400m from NMIMS New Building",
        "price": 18500,
        "rating": 4.7,
        "reviewsCount": 31,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "Attached Bathroom",
          "Zero Brokerage",
          "Lift & Security"
        ]
      },
      {
        "id": "mum-5",
        "title": "Bandra Carter Road Coastal Studio",
        "locality": "Bandra West, Carter Road Perimeter",
        "distance": "800m from National College",
        "price": 24000,
        "rating": 4.9,
        "reviewsCount": 42,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Sea Breeze Balcony",
          "Air Conditioned",
          "High Speed Wi-Fi",
          "Zero Lock-in"
        ]
      },
      {
        "id": "mum-6",
        "title": "Pali Hill Scholar Residency",
        "locality": "Bandra West, Pali Hill",
        "distance": "600m from Linking Road",
        "price": 17000,
        "rating": 4.8,
        "reviewsCount": 37,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Premium Furnishing",
          "Cook on Demand",
          "Security Guard",
          "Power Backup"
        ]
      },
      {
        "id": "mum-7",
        "title": "Chembur TISS Student Abode",
        "locality": "Chembur, Deonar Farm Road",
        "distance": "300m from TISS Old Campus Gate",
        "price": 9800,
        "rating": 4.8,
        "reviewsCount": 48,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Wi-Fi 100Mbps",
          "Nutritious Meals Included",
          "Study Room",
          "Daily Housekeeping"
        ]
      },
      {
        "id": "mum-8",
        "title": "Eastern Express High-Rise 1BHK",
        "locality": "Chembur East, Near Monorail Station",
        "distance": "500m from Chembur Railway Station",
        "price": 14500,
        "rating": 4.7,
        "reviewsCount": 25,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Gated Society",
          "High Floor City Views",
          "Piped Gas",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "hyderabad": {
    "name": "Hyderabad",
    "slug": "hyderabad",
    "tier": 1,
    "state": "Telangana",
    "tagline": "Cyberabad & University Capital of the Deccan",
    "totalRoomsText": "980+ verified rooms in Hyderabad",
    "roomCountNumber": 980,
    "startPrice": "₹6,000",
    "description": "Home to IIIT Hyderabad, University of Hyderabad (HCU), ISB, and Osmania. Modern, air-conditioned co-living and shared student apartments.",
    "image": "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Gachibowli • Madhapur • Hitec City • Mehdipatnam",
    "universities": [
      "IIIT Hyderabad",
      "University of Hyderabad (HCU)",
      "Indian School of Business (ISB)",
      "Osmania University",
      "JNTU Hyderabad"
    ],
    "areas": [
      {
        "id": "gachibowli",
        "name": "Gachibowli",
        "subtext": "IIIT • HCU • DLF Cyber City",
        "roomCount": "410+ rooms",
        "startPrice": "₹7,800/mo",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "madhapur",
        "name": "Madhapur",
        "subtext": "Hitec Metro • Durgam Cheruvu",
        "roomCount": "320+ rooms",
        "startPrice": "₹8,500/mo",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "mehdipatnam",
        "name": "Mehdipatnam",
        "subtext": "Central Transit • Affordable PGs",
        "roomCount": "150+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "kukatpally",
        "name": "Kukatpally / JNTU",
        "subtext": "JNTU Hyderabad • Red Line Metro",
        "roomCount": "100+ rooms",
        "startPrice": "₹6,500/mo",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "hyd-1",
        "title": "Gachibowli DLF Scholar PG",
        "locality": "Gachibowli, Near DLF Cyber City",
        "distance": "800m from IIIT Hyderabad Campus",
        "price": 8200,
        "rating": 4.8,
        "reviewsCount": 56,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Wi-Fi 150Mbps",
          "South & North Meals",
          "Biometric Security"
        ]
      },
      {
        "id": "hyd-2",
        "title": "Madhapur Metro Studio Flat",
        "locality": "Madhapur, Near Hitec City Metro",
        "distance": "400m from Hitec City Metro",
        "price": 11500,
        "rating": 4.7,
        "reviewsCount": 39,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Kitchenette",
          "Attached Balcony",
          "Washing Machine",
          "Zero Lock-in"
        ]
      },
      {
        "id": "hyd-3",
        "title": "HCU Gate Co-Living Suite",
        "locality": "Gachibowli, Near HCU Main Gate",
        "distance": "300m from Hyderabad Central Univ",
        "price": 7800,
        "rating": 4.8,
        "reviewsCount": 44,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "All Meals Included",
          "Study Tables",
          "Wi-Fi 100Mbps",
          "Power Backup"
        ]
      },
      {
        "id": "hyd-4",
        "title": "Madhapur Ayyappa Society 1BHK",
        "locality": "Madhapur, Ayyappa Society",
        "distance": "600m from Durgam Cheruvu Cable Bridge",
        "price": 14000,
        "rating": 4.9,
        "reviewsCount": 35,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "Modular Kitchen",
          "Balcony View",
          "Zero Brokerage"
        ]
      },
      {
        "id": "hyd-5",
        "title": "Mehdipatnam Transit Scholar Home",
        "locality": "Mehdipatnam, Near St. Ann's College",
        "distance": "400m from Mehdipatnam Bus Depot",
        "price": 6000,
        "rating": 4.7,
        "reviewsCount": 51,
        "roomType": "Triple Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Homely Meals",
          "Purified Water",
          "Daily Housekeeping",
          "CCTV Security"
        ]
      },
      {
        "id": "hyd-6",
        "title": "Kukatpally JNTU Metro Suite",
        "locality": "Kukatpally, Near JNTU Campus",
        "distance": "250m from JNTU College Metro",
        "price": 7500,
        "rating": 4.8,
        "reviewsCount": 42,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Wi-Fi 100Mbps",
          "Study Desks",
          "Power Backup"
        ]
      },
      {
        "id": "hyd-7",
        "title": "Kukatpally Housing Board Studio",
        "locality": "Kukatpally, KPHB Colony",
        "distance": "500m from Forum Mall",
        "price": 10500,
        "rating": 4.7,
        "reviewsCount": 27,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "Kitchenette",
          "Attached Washroom",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "kota": {
    "name": "Kota",
    "slug": "kota",
    "tier": 1,
    "state": "Rajasthan",
    "tagline": "India's Coaching Capital & Competitive Exam Hub",
    "totalRoomsText": "850+ verified rooms in Kota",
    "roomCountNumber": 850,
    "startPrice": "₹5,000",
    "description": "Purpose-built study sanctuaries in Landmark City, Vigyan Nagar, and Talwandi. Clean rooms with silent study hours, healthy mess food, and verified hostel wardens.",
    "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Landmark City • Vigyan Nagar • Talwandi • Rajeev Gandhi Nagar",
    "universities": [
      "Allen Career Institute",
      "Resonance",
      "Motion Education",
      "Career Point University"
    ],
    "areas": [
      {
        "id": "landmark-city",
        "name": "Landmark City",
        "subtext": "Kunhari • Top Coaching Campuses",
        "roomCount": "380+ rooms",
        "startPrice": "₹6,200/mo",
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "vigyan-nagar",
        "name": "Vigyan Nagar",
        "subtext": "Central Institutes • Coaching Corridor",
        "roomCount": "270+ rooms",
        "startPrice": "₹5,500/mo",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "talwandi",
        "name": "Talwandi",
        "subtext": "Quiet Residential Sectors • Libraries",
        "roomCount": "200+ rooms",
        "startPrice": "₹5,000/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "kta-1",
        "title": "Landmark City Scholar Sanctuary",
        "locality": "Landmark City, Kunhari",
        "distance": "250m from Allen Samarth Campus",
        "price": 6800,
        "rating": 4.9,
        "reviewsCount": 92,
        "roomType": "Single Room PG",
        "category": "PG",
        "verified": true,
        "matchScore": 98,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Silent Study Zone",
          "Hygienic Mess Meals",
          "Air Cooled",
          "Power Backup 24/7"
        ]
      },
      {
        "id": "kta-2",
        "title": "Vigyan Nagar Study Suite",
        "locality": "Vigyan Nagar, Sector A",
        "distance": "400m from Institute Corridor",
        "price": 5500,
        "rating": 4.7,
        "reviewsCount": 64,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "High Speed Wi-Fi",
          "Purified RO Water",
          "Warden On-site"
        ]
      },
      {
        "id": "kta-3",
        "title": "Talwandi Peaceful Study Haven",
        "locality": "Talwandi, Sector 4",
        "distance": "300m from Commerce College Ground",
        "price": 5200,
        "rating": 4.8,
        "reviewsCount": 51,
        "roomType": "Single Room PG",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Doctor on Call",
          "Air Cooled",
          "Library Access",
          "Strict Quiet Hours"
        ]
      },
      {
        "id": "kta-4",
        "title": "Landmark City AC Executive PG",
        "locality": "Landmark City, Kunhari Block B",
        "distance": "150m from Allen Sangyan",
        "price": 8500,
        "rating": 4.9,
        "reviewsCount": 73,
        "roomType": "Single Room PG",
        "category": "PG",
        "verified": true,
        "matchScore": 97,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Pure Veg Sattvik Food",
          "Biometric Entry",
          "Housekeeping"
        ]
      },
      {
        "id": "kta-5",
        "title": "Rajeev Gandhi Nagar Coaching Suite",
        "locality": "Rajeev Gandhi Nagar, Electronic Complex",
        "distance": "200m from Resonance Head Office",
        "price": 6200,
        "rating": 4.8,
        "reviewsCount": 58,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "3-Time Meals Included",
          "Wi-Fi 100Mbps",
          "Power Backup",
          "Laundry Machine"
        ]
      },
      {
        "id": "kta-6",
        "title": "Vigyan Nagar Independent 1RK Flat",
        "locality": "Vigyan Nagar, Near Road No. 1",
        "distance": "500m from Coaching Cluster",
        "price": 7800,
        "rating": 4.7,
        "reviewsCount": 32,
        "roomType": "Private 1RK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Kitchen Facility",
          "Attached Bathroom",
          "Study Table",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "chennai": {
    "name": "Chennai",
    "slug": "chennai",
    "tier": 1,
    "state": "Tamil Nadu",
    "tagline": "Premier Engineering, Medical & Research Capital of the South",
    "totalRoomsText": "920+ verified rooms in Chennai",
    "roomCountNumber": 920,
    "startPrice": "₹5,800",
    "description": "Home to IIT Madras, Anna University, Loyola College, and the OMR tech corridor. Verified flats and student hostels with authentic South Indian meals and metro access.",
    "image": "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    "hubs": "IIT Madras / Guindy • OMR IT Corridor • Velachery • Anna Nagar",
    "universities": [
      "IIT Madras",
      "Anna University",
      "Loyola College",
      "Madras Christian College (MCC)",
      "SRM University"
    ],
    "areas": [
      {
        "id": "guindy-iit",
        "name": "Guindy & IIT Perimeter",
        "subtext": "IIT Madras • Anna University • Metro",
        "roomCount": "340+ rooms",
        "startPrice": "₹7,200/mo",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "omr",
        "name": "OMR IT Corridor",
        "subtext": "Taramani • Perungudi • Tech Parks",
        "roomCount": "290+ rooms",
        "startPrice": "₹6,800/mo",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "velachery",
        "name": "Velachery",
        "subtext": "MRTS Railway • Grand Mall • Affordable",
        "roomCount": "180+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "anna-nagar",
        "name": "Anna Nagar",
        "subtext": "Coaching Institutes • Tree-lined Avenues",
        "roomCount": "110+ rooms",
        "startPrice": "₹8,500/mo",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "chn-1",
        "title": "Guindy IIT Scholar Suite",
        "locality": "Guindy, Near IIT Madras Gate",
        "distance": "450m from Guindy Metro Station",
        "price": 7500,
        "rating": 4.8,
        "reviewsCount": 52,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Wi-Fi 100Mbps",
          "Authentic South Indian Meals",
          "Power Backup"
        ]
      },
      {
        "id": "chn-2",
        "title": "OMR Taramani Studio Living",
        "locality": "Taramani, Near TIDEL Park",
        "distance": "600m from Taramani MRTS Station",
        "price": 11000,
        "rating": 4.7,
        "reviewsCount": 36,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Kitchenette",
          "Gym Access",
          "24/7 Security",
          "Zero Lock-in"
        ]
      },
      {
        "id": "chn-3",
        "title": "Velachery Junction Student Nest",
        "locality": "Velachery, Near Phoenix Marketcity",
        "distance": "500m from Velachery MRTS",
        "price": 6200,
        "rating": 4.8,
        "reviewsCount": 47,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Mess Meals Included",
          "High Speed Wi-Fi",
          "Daily Cleaning",
          "Washing Machine"
        ]
      },
      {
        "id": "chn-4",
        "title": "Anna Nagar Civil Services Scholar Flat",
        "locality": "Anna Nagar West, Near Tower Park",
        "distance": "350m from Metro Station",
        "price": 13500,
        "rating": 4.9,
        "reviewsCount": 38,
        "roomType": "Private Room in 2BHK",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Quiet Study Room",
          "Air Conditioned",
          "High Speed Wi-Fi",
          "Zero Brokerage"
        ]
      },
      {
        "id": "chn-5",
        "title": "Anna University Perimeter Girls PG",
        "locality": "Guindy, Sardar Patel Road",
        "distance": "250m from Anna University Main Gate",
        "price": 8000,
        "rating": 4.9,
        "reviewsCount": 59,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Female Warden",
          "South Indian Vegetarian Food",
          "Biometric Lock",
          "Study Tables"
        ]
      },
      {
        "id": "chn-6",
        "title": "Perungudi OMR Tech Flat",
        "locality": "Perungudi, OMR Toll Plaza",
        "distance": "700m from RMZ Millenia",
        "price": 12500,
        "rating": 4.7,
        "reviewsCount": 29,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Fully Furnished",
          "Lift & Power Backup",
          "Covered Parking",
          "Zero Brokerage"
        ]
      },
      {
        "id": "chn-7",
        "title": "Velachery Bypass Shared Apartment",
        "locality": "Velachery Bypass Road",
        "distance": "400m from Bus Terminus",
        "price": 6800,
        "rating": 4.7,
        "reviewsCount": 33,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Wi-Fi 100Mbps",
          "Power Backup",
          "RO Water",
          "Housekeeping"
        ]
      }
    ]
  },
  "kolkata": {
    "name": "Kolkata",
    "slug": "kolkata",
    "tier": 1,
    "state": "West Bengal",
    "tagline": "Cultural & Academic Capital of Eastern India",
    "totalRoomsText": "780+ verified rooms in Kolkata",
    "roomCountNumber": 780,
    "startPrice": "₹5,200",
    "description": "Home to Jadavpur University, Presidency, St. Xavier's, and Salt Lake Sector V IT hub. Verified student flats and hostel rooms with home meals and metro connectivity.",
    "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Salt Lake Sector V • New Town • Jadavpur • Park Circus",
    "universities": [
      "Jadavpur University",
      "Presidency University",
      "St. Xavier's College",
      "Calcutta University",
      "IIM Calcutta"
    ],
    "areas": [
      {
        "id": "salt-lake",
        "name": "Salt Lake Sector V",
        "subtext": "Tech Parks • College Campuses • Metro",
        "roomCount": "290+ rooms",
        "startPrice": "₹6,800/mo",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "jadavpur",
        "name": "Jadavpur",
        "subtext": "Jadavpur Univ • 8B Bus Stand • Cafes",
        "roomCount": "240+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "new-town",
        "name": "New Town",
        "subtext": "Modern Gated Townships • Universities",
        "roomCount": "160+ rooms",
        "startPrice": "₹7,500/mo",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "park-circus",
        "name": "Park Circus",
        "subtext": "Central Transit • St. Xavier's Corridor",
        "roomCount": "90+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "kol-1",
        "title": "Salt Lake Sector V Scholar PG",
        "locality": "Salt Lake, Sector V",
        "distance": "400m from Karunamoyee Metro",
        "price": 7200,
        "rating": 4.8,
        "reviewsCount": 46,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Bengali & North Meals",
          "High-speed Wi-Fi",
          "Daily Cleaning"
        ]
      },
      {
        "id": "kol-2",
        "title": "Jadavpur Heritage Studio Flat",
        "locality": "Jadavpur, Near 8B Bus Stand",
        "distance": "300m from Jadavpur University Gate 4",
        "price": 9500,
        "rating": 4.9,
        "reviewsCount": 58,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Natural Light",
          "Attached Washroom",
          "Study Balcony",
          "Zero Brokerage"
        ]
      },
      {
        "id": "kol-3",
        "title": "Jadavpur Central Scholar Nest",
        "locality": "Jadavpur, Central Road",
        "distance": "200m from Jadavpur University",
        "price": 5400,
        "rating": 4.8,
        "reviewsCount": 42,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "3-Time Meals",
          "Wi-Fi 100Mbps",
          "Quiet Study Atmosphere",
          "Power Backup"
        ]
      },
      {
        "id": "kol-4",
        "title": "New Town Action Area 1 Modern 1BHK",
        "locality": "New Town, Action Area 1",
        "distance": "500m from Eco Space",
        "price": 11000,
        "rating": 4.8,
        "reviewsCount": 33,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Modern Gated Complex",
          "Swimming Pool & Gym",
          "High Speed Wi-Fi",
          "Zero Brokerage"
        ]
      },
      {
        "id": "kol-5",
        "title": "Park Circus St. Xavier's Corridor PG",
        "locality": "Park Circus, Near 7 Point Crossing",
        "distance": "600m from St. Xavier's College",
        "price": 6800,
        "rating": 4.7,
        "reviewsCount": 39,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Home Cooked Meals",
          "Clean Washrooms",
          "Wi-Fi",
          "Daily Cleaning"
        ]
      },
      {
        "id": "kol-6",
        "title": "Salt Lake Karunamoyee Studio",
        "locality": "Salt Lake, Karunamoyee",
        "distance": "250m from Central Metro",
        "price": 10200,
        "rating": 4.8,
        "reviewsCount": 29,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Air Conditioned",
          "Kitchenette",
          "Attached Balcony",
          "Zero Lock-in"
        ]
      },
      {
        "id": "kol-7",
        "title": "New Town Student Residency",
        "locality": "New Town, Near City Centre 2",
        "distance": "800m from St. Xavier's University New Town",
        "price": 7800,
        "rating": 4.7,
        "reviewsCount": 31,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Wi-Fi 100Mbps",
          "Bus Shuttle Service",
          "Security"
        ]
      }
    ]
  },
  "ahmedabad": {
    "name": "Ahmedabad",
    "slug": "ahmedabad",
    "tier": 1,
    "state": "Gujarat",
    "tagline": "India's Design, Management & Startup Dynamo",
    "totalRoomsText": "760+ verified rooms in Ahmedabad",
    "roomCountNumber": 760,
    "startPrice": "₹5,500",
    "description": "Home to IIM Ahmedabad, CEPT University, NID, and Gujarat University. Modern student living along Navrangpura, Vastrapur, and SG Highway.",
    "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Navrangpura • Vastrapur • SG Highway • Bodakdev",
    "universities": [
      "IIM Ahmedabad",
      "CEPT University",
      "National Institute of Design (NID)",
      "Gujarat University",
      "Nirma University"
    ],
    "areas": [
      {
        "id": "navrangpura",
        "name": "Navrangpura",
        "subtext": "CEPT • Gujarat University • Law Garden",
        "roomCount": "310+ rooms",
        "startPrice": "₹6,800/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "vastrapur",
        "name": "Vastrapur",
        "subtext": "IIM-A • Vastrapur Lake • Cafes",
        "roomCount": "240+ rooms",
        "startPrice": "₹8,200/mo",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "sg-highway",
        "name": "SG Highway",
        "subtext": "Nirma University • Modern Townships",
        "roomCount": "210+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "amd-1",
        "title": "Vastrapur Scholar Nest — Twin Share",
        "locality": "Vastrapur, Near IIM Ahmedabad",
        "distance": "500m from IIM-A Main Gate",
        "price": 7800,
        "rating": 4.9,
        "reviewsCount": 42,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Pure Veg Food",
          "High-speed Wi-Fi",
          "Daily Cleaning",
          "AC Included"
        ]
      },
      {
        "id": "amd-2",
        "title": "Navrangpura Designer Studio Flat",
        "locality": "Navrangpura, Near CEPT University",
        "distance": "400m from CEPT Campus",
        "price": 11500,
        "rating": 4.8,
        "reviewsCount": 34,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Natural Lighting",
          "Attached Bathroom",
          "Kitchenette",
          "Zero Lock-in"
        ]
      },
      {
        "id": "amd-3",
        "title": "Navrangpura Law Garden Scholar PG",
        "locality": "Navrangpura, Near Law Garden",
        "distance": "600m from Gujarat University",
        "price": 6500,
        "rating": 4.8,
        "reviewsCount": 49,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Authentic Gujarati & North Meals",
          "Wi-Fi 100Mbps",
          "Power Backup",
          "RO Water"
        ]
      },
      {
        "id": "amd-4",
        "title": "SG Highway Nirma University Suite",
        "locality": "SG Highway, Near Nirma University",
        "distance": "350m from Nirma Campus Gate",
        "price": 7200,
        "rating": 4.7,
        "reviewsCount": 38,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Daily Cleaning",
          "High Speed Wi-Fi",
          "Security Guard"
        ]
      },
      {
        "id": "amd-5",
        "title": "Vastrapur Lake Modern 1BHK",
        "locality": "Vastrapur, Near Vastrapur Lake",
        "distance": "700m from Alpha One Mall",
        "price": 13000,
        "rating": 4.9,
        "reviewsCount": 27,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Fully Furnished",
          "Gated Security",
          "Piped Gas",
          "Zero Brokerage"
        ]
      },
      {
        "id": "amd-6",
        "title": "Bodakdev Executive Flatmate Room",
        "locality": "Bodakdev, Judges Bungalow Road",
        "distance": "1 km from Pakwan Junction",
        "price": 12000,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Single Room in 3BHK",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Air Conditioned",
          "Attached Washroom",
          "Cook Available",
          "Wi-Fi 150Mbps"
        ]
      },
      {
        "id": "amd-7",
        "title": "Navrangpura Commerce Six Roads PG",
        "locality": "Navrangpura, Commerce Six Roads",
        "distance": "300m from HL College of Commerce",
        "price": 7000,
        "rating": 4.8,
        "reviewsCount": 36,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Pure Veg Meals",
          "Daily Housekeeping",
          "CCTV",
          "Study Desk"
        ]
      }
    ]
  },
  "jaipur": {
    "name": "Jaipur",
    "slug": "jaipur",
    "tier": 1,
    "state": "Rajasthan",
    "tagline": "The Pink City & Rajasthan's Premier University Center",
    "totalRoomsText": "690+ verified rooms in Jaipur",
    "roomCountNumber": 690,
    "startPrice": "₹4,800",
    "description": "Home to MNIT Jaipur, University of Rajasthan, Manipal University Jaipur, and top engineering campuses across Malviya Nagar, Mansarovar, and Raja Park.",
    "image": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Malviya Nagar • Mansarovar • Raja Park • Jagatpura",
    "universities": [
      "MNIT Jaipur",
      "University of Rajasthan",
      "Manipal University Jaipur",
      "JECRC University",
      "Amity Jaipur"
    ],
    "areas": [
      {
        "id": "malviya-nagar",
        "name": "Malviya Nagar",
        "subtext": "MNIT Campus • World Trade Park",
        "roomCount": "280+ rooms",
        "startPrice": "₹6,500/mo",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "mansarovar",
        "name": "Mansarovar",
        "subtext": "Metro Line • Coaching Hub • Quiet PGs",
        "roomCount": "220+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "raja-park",
        "name": "Raja Park",
        "subtext": "University of Rajasthan • Cafes & Food",
        "roomCount": "190+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "jai-1",
        "title": "MNIT Malviya Nagar Scholar Suite",
        "locality": "Malviya Nagar, Near MNIT Jaipur",
        "distance": "400m from MNIT Main Gate",
        "price": 6800,
        "rating": 4.8,
        "reviewsCount": 51,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Wi-Fi 100Mbps",
          "Pure Vegetarian Meals",
          "Power Backup"
        ]
      },
      {
        "id": "jai-2",
        "title": "Mansarovar Modern Student Flat",
        "locality": "Mansarovar, Near Metro Station",
        "distance": "300m from Mansarovar Metro",
        "price": 9000,
        "rating": 4.7,
        "reviewsCount": 33,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Washroom",
          "Furnished",
          "Kitchenette",
          "Zero Brokerage"
        ]
      },
      {
        "id": "jai-3",
        "title": "Raja Park University Scholar Home",
        "locality": "Raja Park, Near Birla Temple",
        "distance": "600m from Rajasthan Univ Campus",
        "price": 5800,
        "rating": 4.8,
        "reviewsCount": 46,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "All Meals Included",
          "High Speed Wi-Fi",
          "Purified Water",
          "Daily Cleaning"
        ]
      },
      {
        "id": "jai-4",
        "title": "Malviya Nagar Calgiri Road Studio",
        "locality": "Malviya Nagar, Calgiri Marg",
        "distance": "500m from World Trade Park",
        "price": 11000,
        "rating": 4.9,
        "reviewsCount": 38,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Air Conditioned",
          "Attached Balcony",
          "Modular Kitchen",
          "Zero Brokerage"
        ]
      },
      {
        "id": "jai-5",
        "title": "Jagatpura Engineering Corridor PG",
        "locality": "Jagatpura, Near JECRC University",
        "distance": "400m from JECRC Gate",
        "price": 6000,
        "rating": 4.7,
        "reviewsCount": 43,
        "roomType": "Twin Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "AC Included",
          "Mess Meals Included",
          "Wi-Fi 100Mbps",
          "Security"
        ]
      },
      {
        "id": "jai-6",
        "title": "Mansarovar Sector 3 Executive 1BHK",
        "locality": "Mansarovar, Sector 3",
        "distance": "500m from RIICO Metro Station",
        "price": 10500,
        "rating": 4.8,
        "reviewsCount": 25,
        "roomType": "Private 1BHK Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished Living",
          "Piped Gas",
          "Dedicated Parking",
          "Zero Brokerage"
        ]
      },
      {
        "id": "jai-7",
        "title": "Gopalpura Bypass Coaching Hub PG",
        "locality": "Gopalpura Bypass, Near Riddhi Siddhi",
        "distance": "200m from Major Coaching Centers",
        "price": 6400,
        "rating": 4.8,
        "reviewsCount": 52,
        "roomType": "Single Room PG",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Study Room Access",
          "Pure Veg Meals",
          "RO Water",
          "CCTV Security"
        ]
      }
    ]
  },
  "surat": {
    "name": "Surat",
    "slug": "surat",
    "tier": 2,
    "state": "Gujarat",
    "tagline": "Gujarat's Commercial Dynamo & Engineering Hub",
    "totalRoomsText": "280+ verified rooms in Surat",
    "roomCountNumber": 280,
    "startPrice": "₹4,800",
    "description": "Home to SVNIT and Veer Narmad South Gujarat University. Budget-friendly student flats and shared PGs across Athwa Lines and Vesu.",
    "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Athwa Lines • Vesu",
    "universities": [
      "SVNIT Surat",
      "VNSGU Surat",
      "Auro University"
    ],
    "areas": [
      {
        "id": "athwa-lines",
        "name": "Athwa Lines",
        "subtext": "SVNIT Campus • Cafes",
        "roomCount": "160+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "vesu",
        "name": "Vesu",
        "subtext": "Modern Gated Apartments",
        "roomCount": "120+ rooms",
        "startPrice": "₹6,500/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "surat-1",
        "title": "Surat Scholar PG — Twin Share",
        "locality": "Athwa Lines, Near Campus",
        "distance": "400m from College Gates",
        "price": 5200,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "surat-2",
        "title": "Vesu Studio Apartment",
        "locality": "Vesu",
        "distance": "600m from Transit Stop",
        "price": 8500,
        "rating": 4.7,
        "reviewsCount": 20,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "surat-3",
        "title": "Athwa Lines Single Room Flatmate Suite",
        "locality": "Athwa Lines, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7020,
        "rating": 4.8,
        "reviewsCount": 18,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "lucknow": {
    "name": "Lucknow",
    "slug": "lucknow",
    "tier": 2,
    "state": "Uttar Pradesh",
    "tagline": "Historic Capital & Academic Center of Uttar Pradesh",
    "totalRoomsText": "420+ verified rooms in Lucknow",
    "roomCountNumber": 420,
    "startPrice": "₹4,500",
    "description": "Home to IIM Lucknow, KGMU, and Lucknow University. Student PGs with home-cooked Awadhi meals across Gomti Nagar and Aliganj.",
    "image": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Gomti Nagar • Aliganj",
    "universities": [
      "IIM Lucknow",
      "KGMU",
      "Lucknow University",
      "AKTU"
    ],
    "areas": [
      {
        "id": "gomti-nagar",
        "name": "Gomti Nagar",
        "subtext": "Modern Sectors • Near Colleges",
        "roomCount": "250+ rooms",
        "startPrice": "₹5,500/mo",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "aliganj",
        "name": "Aliganj",
        "subtext": "Coaching Centers • Metro Access",
        "roomCount": "170+ rooms",
        "startPrice": "₹4,500/mo",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "lucknow-1",
        "title": "Lucknow Scholar PG — Twin Share",
        "locality": "Gomti Nagar, Near Campus",
        "distance": "400m from College Gates",
        "price": 4800,
        "rating": 4.8,
        "reviewsCount": 33,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "lucknow-2",
        "title": "Aliganj Studio Apartment",
        "locality": "Aliganj",
        "distance": "600m from Transit Stop",
        "price": 8000,
        "rating": 4.7,
        "reviewsCount": 22,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "lucknow-3",
        "title": "Gomti Nagar Single Room Flatmate Suite",
        "locality": "Gomti Nagar, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6480,
        "rating": 4.8,
        "reviewsCount": 21,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "kanpur": {
    "name": "Kanpur",
    "slug": "kanpur",
    "tier": 2,
    "state": "Uttar Pradesh",
    "tagline": "Premier Engineering & Technology Corridor",
    "totalRoomsText": "340+ verified rooms in Kanpur",
    "roomCountNumber": 340,
    "startPrice": "₹4,200",
    "description": "Anchored by IIT Kanpur, HBTU, and GSVM Medical College. Purpose-built student accommodations with study amenities and campus proximity.",
    "image": "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Kalyanpur • Swaroop Nagar",
    "universities": [
      "IIT Kanpur",
      "HBTU Kanpur",
      "GSVM Medical College"
    ],
    "areas": [
      {
        "id": "kalyanpur",
        "name": "Kalyanpur",
        "subtext": "IIT Kanpur Perimeter",
        "roomCount": "210+ rooms",
        "startPrice": "₹4,600/mo",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "swaroop-nagar",
        "name": "Swaroop Nagar",
        "subtext": "HBTU & GSVM Corridor",
        "roomCount": "130+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "kanpur-1",
        "title": "Kanpur Scholar PG — Twin Share",
        "locality": "Kalyanpur, Near Campus",
        "distance": "400m from College Gates",
        "price": 4500,
        "rating": 4.8,
        "reviewsCount": 36,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "kanpur-2",
        "title": "Swaroop Nagar Studio Apartment",
        "locality": "Swaroop Nagar",
        "distance": "600m from Transit Stop",
        "price": 7500,
        "rating": 4.7,
        "reviewsCount": 24,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "kanpur-3",
        "title": "Kalyanpur Single Room Flatmate Suite",
        "locality": "Kalyanpur, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6075,
        "rating": 4.8,
        "reviewsCount": 24,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "nagpur": {
    "name": "Nagpur",
    "slug": "nagpur",
    "tier": 2,
    "state": "Maharashtra",
    "tagline": "Central India's Education & Technology Crossroads",
    "totalRoomsText": "360+ verified rooms in Nagpur",
    "roomCountNumber": 360,
    "startPrice": "₹4,800",
    "description": "Home to VNIT Nagpur, AIIMS, IIM Nagpur, and RTMNU. Serene tree-lined localities with modern student housing.",
    "image": "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Dharampeth • Ramdaspeth",
    "universities": [
      "VNIT Nagpur",
      "IIM Nagpur",
      "AIIMS Nagpur",
      "RTMNU"
    ],
    "areas": [
      {
        "id": "dharampeth",
        "name": "Dharampeth",
        "subtext": "Central Transit • Student Cafes",
        "roomCount": "200+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "ramdaspeth",
        "name": "Ramdaspeth",
        "subtext": "VNIT Proximity • Quiet Sectors",
        "roomCount": "160+ rooms",
        "startPrice": "₹5,800/mo",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "nagpur-1",
        "title": "Nagpur Scholar PG — Twin Share",
        "locality": "Dharampeth, Near Campus",
        "distance": "400m from College Gates",
        "price": 5200,
        "rating": 4.8,
        "reviewsCount": 39,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "nagpur-2",
        "title": "Ramdaspeth Studio Apartment",
        "locality": "Ramdaspeth",
        "distance": "600m from Transit Stop",
        "price": 8200,
        "rating": 4.7,
        "reviewsCount": 26,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "nagpur-3",
        "title": "Dharampeth Single Room Flatmate Suite",
        "locality": "Dharampeth, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7020,
        "rating": 4.8,
        "reviewsCount": 27,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "indore": {
    "name": "Indore",
    "slug": "indore",
    "tier": 2,
    "state": "Madhya Pradesh",
    "tagline": "India's Cleanest City & Premier Dual IIT-IIM Hub",
    "totalRoomsText": "520+ verified rooms in Indore",
    "roomCountNumber": 520,
    "startPrice": "₹5,000",
    "description": "The only Indian city hosting both an IIT and an IIM, alongside DAVV and the famous Bhawarkua coaching corridor. India's cleanest city with vibrant student culture.",
    "image": "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Bhawarkua • Vijay Nagar",
    "universities": [
      "IIT Indore",
      "IIM Indore",
      "DAVV Indore",
      "SGSITS"
    ],
    "areas": [
      {
        "id": "bhawarkua",
        "name": "Bhawarkua",
        "subtext": "Famous Coaching Hub • Student Corridors",
        "roomCount": "310+ rooms",
        "startPrice": "₹5,000/mo",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "vijay-nagar",
        "name": "Vijay Nagar",
        "subtext": "Modern Malls • Tech & College Connect",
        "roomCount": "210+ rooms",
        "startPrice": "₹6,800/mo",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "indore-1",
        "title": "Indore Scholar PG — Twin Share",
        "locality": "Bhawarkua, Near Campus",
        "distance": "400m from College Gates",
        "price": 5400,
        "rating": 4.8,
        "reviewsCount": 42,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "indore-2",
        "title": "Vijay Nagar Studio Apartment",
        "locality": "Vijay Nagar",
        "distance": "600m from Transit Stop",
        "price": 9000,
        "rating": 4.7,
        "reviewsCount": 28,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "indore-3",
        "title": "Bhawarkua Single Room Flatmate Suite",
        "locality": "Bhawarkua, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7290,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "bhopal": {
    "name": "Bhopal",
    "slug": "bhopal",
    "tier": 2,
    "state": "Madhya Pradesh",
    "tagline": "City of Lakes & National Institutes of Eminence",
    "totalRoomsText": "380+ verified rooms in Bhopal",
    "roomCountNumber": 380,
    "startPrice": "₹4,500",
    "description": "Home to MANIT, AIIMS Bhopal, NLIU, and IISER. Affordable student residences near lakeside avenues and university corridors.",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "hubs": "MP Nagar • Arera Colony",
    "universities": [
      "MANIT Bhopal",
      "AIIMS Bhopal",
      "NLIU",
      "IISER Bhopal"
    ],
    "areas": [
      {
        "id": "mp-nagar",
        "name": "MP Nagar",
        "subtext": "Commercial & Coaching Center",
        "roomCount": "220+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "arera-colony",
        "name": "Arera Colony",
        "subtext": "MANIT & AIIMS Proximity",
        "roomCount": "160+ rooms",
        "startPrice": "₹5,600/mo",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "bhopal-1",
        "title": "Bhopal Scholar PG — Twin Share",
        "locality": "MP Nagar, Near Campus",
        "distance": "400m from College Gates",
        "price": 4700,
        "rating": 4.8,
        "reviewsCount": 45,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 97,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "bhopal-2",
        "title": "Arera Colony Studio Apartment",
        "locality": "Arera Colony",
        "distance": "600m from Transit Stop",
        "price": 7800,
        "rating": 4.7,
        "reviewsCount": 30,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "bhopal-3",
        "title": "MP Nagar Single Room Flatmate Suite",
        "locality": "MP Nagar, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6345,
        "rating": 4.8,
        "reviewsCount": 18,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "visakhapatnam": {
    "name": "Visakhapatnam",
    "slug": "visakhapatnam",
    "tier": 2,
    "state": "Andhra Pradesh",
    "tagline": "Coastal Metropolis & Andhra Pradesh's Educational Hub",
    "totalRoomsText": "310+ verified rooms in Visakhapatnam",
    "roomCountNumber": 310,
    "startPrice": "₹5,000",
    "description": "Anchored by Andhra University, IIM Visakhapatnam, and GITAM. Coastal student residences with fresh sea breeze and reliable transit.",
    "image": "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
    "hubs": "MVP Colony • Siripuram",
    "universities": [
      "Andhra University",
      "IIM Visakhapatnam",
      "GITAM University"
    ],
    "areas": [
      {
        "id": "mvp-colony",
        "name": "MVP Colony",
        "subtext": "Asia's Largest Colony • Beachside PGs",
        "roomCount": "190+ rooms",
        "startPrice": "₹5,500/mo",
        "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "siripuram",
        "name": "Siripuram",
        "subtext": "Andhra University Main Campus",
        "roomCount": "120+ rooms",
        "startPrice": "₹5,000/mo",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "visakhapatnam-1",
        "title": "Visakhapatnam Scholar PG — Twin Share",
        "locality": "MVP Colony, Near Campus",
        "distance": "400m from College Gates",
        "price": 5200,
        "rating": 4.8,
        "reviewsCount": 48,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "visakhapatnam-2",
        "title": "Siripuram Studio Apartment",
        "locality": "Siripuram",
        "distance": "600m from Transit Stop",
        "price": 8500,
        "rating": 4.7,
        "reviewsCount": 32,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "visakhapatnam-3",
        "title": "MVP Colony Single Room Flatmate Suite",
        "locality": "MVP Colony, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7020,
        "rating": 4.8,
        "reviewsCount": 21,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "patna": {
    "name": "Patna",
    "slug": "patna",
    "tier": 2,
    "state": "Bihar",
    "tagline": "Major Coaching Capital & Historic Center of Learning",
    "totalRoomsText": "410+ verified rooms in Patna",
    "roomCountNumber": 410,
    "startPrice": "₹4,000",
    "description": "Home to IIT Patna, NIT Patna, AIIMS Patna, and the bustling Boring Road civil services and JEE/NEET prep cluster.",
    "image": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Boring Road • Kankarbagh",
    "universities": [
      "IIT Patna",
      "NIT Patna",
      "AIIMS Patna",
      "Patna University"
    ],
    "areas": [
      {
        "id": "boring-road",
        "name": "Boring Road",
        "subtext": "Premier Coaching & Student Street",
        "roomCount": "260+ rooms",
        "startPrice": "₹4,500/mo",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "kankarbagh",
        "name": "Kankarbagh",
        "subtext": "Affordable Shared Accommodations",
        "roomCount": "150+ rooms",
        "startPrice": "₹4,000/mo",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "patna-1",
        "title": "Patna Scholar PG — Twin Share",
        "locality": "Boring Road, Near Campus",
        "distance": "400m from College Gates",
        "price": 4200,
        "rating": 4.8,
        "reviewsCount": 51,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "patna-2",
        "title": "Kankarbagh Studio Apartment",
        "locality": "Kankarbagh",
        "distance": "600m from Transit Stop",
        "price": 7000,
        "rating": 4.7,
        "reviewsCount": 34,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "patna-3",
        "title": "Boring Road Single Room Flatmate Suite",
        "locality": "Boring Road, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 5670,
        "rating": 4.8,
        "reviewsCount": 24,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "vadodara": {
    "name": "Vadodara",
    "slug": "vadodara",
    "tier": 2,
    "state": "Gujarat",
    "tagline": "Cultural Capital & MSU Academic Center of Gujarat",
    "totalRoomsText": "290+ verified rooms in Vadodara",
    "roomCountNumber": 290,
    "startPrice": "₹4,600",
    "description": "Home to the historic Maharaja Sayajirao University (MSU) and Parul University. Safe, cosmopolitan neighborhoods for outstation students.",
    "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Fatehgunj • Alkapuri",
    "universities": [
      "MS University of Baroda",
      "Parul University",
      "GSFC University"
    ],
    "areas": [
      {
        "id": "fatehgunj",
        "name": "Fatehgunj",
        "subtext": "MSU Campus Perimeter • Cafes",
        "roomCount": "170+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "alkapuri",
        "name": "Alkapuri",
        "subtext": "Central Transit • Modern Flats",
        "roomCount": "120+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "vadodara-1",
        "title": "Vadodara Scholar PG — Twin Share",
        "locality": "Fatehgunj, Near Campus",
        "distance": "400m from College Gates",
        "price": 4800,
        "rating": 4.8,
        "reviewsCount": 54,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "vadodara-2",
        "title": "Alkapuri Studio Apartment",
        "locality": "Alkapuri",
        "distance": "600m from Transit Stop",
        "price": 7800,
        "rating": 4.7,
        "reviewsCount": 36,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "vadodara-3",
        "title": "Fatehgunj Single Room Flatmate Suite",
        "locality": "Fatehgunj, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6480,
        "rating": 4.8,
        "reviewsCount": 27,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "coimbatore": {
    "name": "Coimbatore",
    "slug": "coimbatore",
    "tier": 2,
    "state": "Tamil Nadu",
    "tagline": "Educational Powerhouse & Tech Corridor of Western Tamil Nadu",
    "totalRoomsText": "350+ verified rooms in Coimbatore",
    "roomCountNumber": 350,
    "startPrice": "₹4,800",
    "description": "Home to PSG Tech, Coimbatore Institute of Technology, and Bharathiar University. Clean, pleasant student PGs with traditional South Indian mess food.",
    "image": "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Peelamedu • Gandhipuram",
    "universities": [
      "PSG College of Technology",
      "CIT Coimbatore",
      "Bharathiar University"
    ],
    "areas": [
      {
        "id": "peelamedu",
        "name": "Peelamedu",
        "subtext": "PSG Tech & Medical Corridor",
        "roomCount": "220+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "gandhipuram",
        "name": "Gandhipuram",
        "subtext": "Central Bus Stand & Student Markets",
        "roomCount": "130+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "coimbatore-1",
        "title": "Coimbatore Scholar PG — Twin Share",
        "locality": "Peelamedu, Near Campus",
        "distance": "400m from College Gates",
        "price": 5000,
        "rating": 4.8,
        "reviewsCount": 32,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "coimbatore-2",
        "title": "Gandhipuram Studio Apartment",
        "locality": "Gandhipuram",
        "distance": "600m from Transit Stop",
        "price": 8000,
        "rating": 4.7,
        "reviewsCount": 38,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "coimbatore-3",
        "title": "Peelamedu Single Room Flatmate Suite",
        "locality": "Peelamedu, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6750,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "ludhiana": {
    "name": "Ludhiana",
    "slug": "ludhiana",
    "tier": 2,
    "state": "Punjab & Chandigarh",
    "tagline": "Punjab's Academic, Agricultural & Industrial Core",
    "totalRoomsText": "240+ verified rooms in Ludhiana",
    "roomCountNumber": 240,
    "startPrice": "₹4,800",
    "description": "Home to Punjab Agricultural University (PAU), DMC, and Christian Medical College. Spacious student accommodations with warm Punjabi hospitality.",
    "image": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Sarabha Nagar • Model Town",
    "universities": [
      "Punjab Agricultural University",
      "CMC Ludhiana",
      "DMCH Ludhiana"
    ],
    "areas": [
      {
        "id": "sarabha-nagar",
        "name": "Sarabha Nagar",
        "subtext": "PAU Gate • Student Cafes & Markets",
        "roomCount": "150+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "model-town",
        "name": "Model Town",
        "subtext": "Central Residential Sector",
        "roomCount": "90+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "ludhiana-1",
        "title": "Ludhiana Scholar PG — Twin Share",
        "locality": "Sarabha Nagar, Near Campus",
        "distance": "400m from College Gates",
        "price": 5000,
        "rating": 4.8,
        "reviewsCount": 35,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "ludhiana-2",
        "title": "Model Town Studio Apartment",
        "locality": "Model Town",
        "distance": "600m from Transit Stop",
        "price": 7800,
        "rating": 4.7,
        "reviewsCount": 20,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "ludhiana-3",
        "title": "Sarabha Nagar Single Room Flatmate Suite",
        "locality": "Sarabha Nagar, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6750,
        "rating": 4.8,
        "reviewsCount": 18,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "agra": {
    "name": "Agra",
    "slug": "agra",
    "tier": 2,
    "state": "Uttar Pradesh",
    "tagline": "Heritage Hub & Premier University Gateway",
    "totalRoomsText": "210+ verified rooms in Agra",
    "roomCountNumber": 210,
    "startPrice": "₹4,200",
    "description": "Anchored by Dayalbagh Educational Institute (DEI) and Dr. Bhimrao Ambedkar University. Budget-friendly student flats near coaching clusters.",
    "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Dayalbagh • Sanjay Place",
    "universities": [
      "Dayalbagh Educational Institute",
      "Dr. B.R. Ambedkar University",
      "SN Medical College"
    ],
    "areas": [
      {
        "id": "dayalbagh",
        "name": "Dayalbagh",
        "subtext": "DEI Campus • Quiet Green Enclaves",
        "roomCount": "130+ rooms",
        "startPrice": "₹4,400/mo",
        "image": "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "sanjay-place",
        "name": "Sanjay Place",
        "subtext": "Commercial & Coaching Hub",
        "roomCount": "80+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "agra-1",
        "title": "Agra Scholar PG — Twin Share",
        "locality": "Dayalbagh, Near Campus",
        "distance": "400m from College Gates",
        "price": 4400,
        "rating": 4.8,
        "reviewsCount": 38,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 97,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "agra-2",
        "title": "Sanjay Place Studio Apartment",
        "locality": "Sanjay Place",
        "distance": "600m from Transit Stop",
        "price": 7000,
        "rating": 4.7,
        "reviewsCount": 22,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "agra-3",
        "title": "Dayalbagh Single Room Flatmate Suite",
        "locality": "Dayalbagh, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 5940,
        "rating": 4.8,
        "reviewsCount": 21,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "nashik": {
    "name": "Nashik",
    "slug": "nashik",
    "tier": 2,
    "state": "Maharashtra",
    "tagline": "Maharashtra's Growing Higher-Ed & Engineering Valley",
    "totalRoomsText": "250+ verified rooms in Nashik",
    "roomCountNumber": 250,
    "startPrice": "₹4,500",
    "description": "Home to KK Wagh, Sandip University, and MET League of Colleges. Pleasant climate, peaceful residential sectors, and affordable rent.",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "hubs": "College Road • Gangapur Road",
    "universities": [
      "Sandip University",
      "KK Wagh Institute",
      "MUHS Nashik"
    ],
    "areas": [
      {
        "id": "college-road",
        "name": "College Road",
        "subtext": "BYK & RYK Campuses • Youth Cafes",
        "roomCount": "150+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "gangapur-road",
        "name": "Gangapur Road",
        "subtext": "Modern Apartments & PGs",
        "roomCount": "100+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "nashik-1",
        "title": "Nashik Scholar PG — Twin Share",
        "locality": "College Road, Near Campus",
        "distance": "400m from College Gates",
        "price": 4800,
        "rating": 4.8,
        "reviewsCount": 41,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "nashik-2",
        "title": "Gangapur Road Studio Apartment",
        "locality": "Gangapur Road",
        "distance": "600m from Transit Stop",
        "price": 7600,
        "rating": 4.7,
        "reviewsCount": 24,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "nashik-3",
        "title": "College Road Single Room Flatmate Suite",
        "locality": "College Road, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6480,
        "rating": 4.8,
        "reviewsCount": 24,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "kochi": {
    "name": "Kochi",
    "slug": "kochi",
    "tier": 2,
    "state": "Kerala",
    "tagline": "Kerala's Coastal Tech Hub & Maritime Academic Center",
    "totalRoomsText": "320+ verified rooms in Kochi",
    "roomCountNumber": 320,
    "startPrice": "₹5,200",
    "description": "Home to CUSAT, Infopark student interns, and St. Teresa's College. Metro-connected student apartments near Kakkanad tech corridor.",
    "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Kakkanad • Kalamassery",
    "universities": [
      "CUSAT",
      "Rajagiri College",
      "St. Teresa's College"
    ],
    "areas": [
      {
        "id": "kalamassery",
        "name": "Kalamassery",
        "subtext": "CUSAT Campus • Metro Station",
        "roomCount": "180+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "kakkanad",
        "name": "Kakkanad",
        "subtext": "Infopark • Rajagiri Engineering",
        "roomCount": "140+ rooms",
        "startPrice": "₹6,500/mo",
        "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "kochi-1",
        "title": "Kochi Scholar PG — Twin Share",
        "locality": "Kalamassery, Near Campus",
        "distance": "400m from College Gates",
        "price": 5500,
        "rating": 4.8,
        "reviewsCount": 44,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "kochi-2",
        "title": "Kakkanad Studio Apartment",
        "locality": "Kakkanad",
        "distance": "600m from Transit Stop",
        "price": 8500,
        "rating": 4.7,
        "reviewsCount": 26,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "kochi-3",
        "title": "Kalamassery Single Room Flatmate Suite",
        "locality": "Kalamassery, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7425,
        "rating": 4.8,
        "reviewsCount": 27,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "varanasi": {
    "name": "Varanasi",
    "slug": "varanasi",
    "tier": 2,
    "state": "Uttar Pradesh",
    "tagline": "Spiritual Core & Renowned BHU Academic Capital",
    "totalRoomsText": "340+ verified rooms in Varanasi",
    "roomCountNumber": 340,
    "startPrice": "₹4,200",
    "description": "Centered around Banaras Hindu University (BHU), IIT BHU, and IMS. Vibrant student culture along Lanka and Assi Ghat with zero brokerage.",
    "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Lanka • Assi Ghat",
    "universities": [
      "Banaras Hindu University (BHU)",
      "IIT (BHU) Varanasi",
      "MGKV"
    ],
    "areas": [
      {
        "id": "lanka",
        "name": "Lanka",
        "subtext": "BHU Main Gate • Student Eateries",
        "roomCount": "220+ rooms",
        "startPrice": "₹4,500/mo",
        "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "assi-ghat",
        "name": "Assi Ghat",
        "subtext": "Riverside Study Cafes & Hostels",
        "roomCount": "120+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "varanasi-1",
        "title": "Varanasi Scholar PG — Twin Share",
        "locality": "Lanka, Near Campus",
        "distance": "400m from College Gates",
        "price": 4500,
        "rating": 4.8,
        "reviewsCount": 47,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "varanasi-2",
        "title": "Assi Ghat Studio Apartment",
        "locality": "Assi Ghat",
        "distance": "600m from Transit Stop",
        "price": 7200,
        "rating": 4.7,
        "reviewsCount": 28,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "varanasi-3",
        "title": "Lanka Single Room Flatmate Suite",
        "locality": "Lanka, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6075,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "madurai": {
    "name": "Madurai",
    "slug": "madurai",
    "tier": 2,
    "state": "Tamil Nadu",
    "tagline": "South Tamil Nadu's Historic Learning & Medical Hub",
    "totalRoomsText": "230+ verified rooms in Madurai",
    "roomCountNumber": 230,
    "startPrice": "₹4,200",
    "description": "Home to Madurai Kamaraj University, TCE, and Madurai Medical College. Peaceful, traditional student living with healthy South Indian meals.",
    "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    "hubs": "KK Nagar • Anna Nagar",
    "universities": [
      "Madurai Kamaraj University",
      "Thiagarajar College of Engineering",
      "The American College"
    ],
    "areas": [
      {
        "id": "kk-nagar",
        "name": "KK Nagar",
        "subtext": "Medical College Proximity",
        "roomCount": "140+ rooms",
        "startPrice": "₹4,500/mo",
        "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "anna-nagar-mdu",
        "name": "Anna Nagar",
        "subtext": "Student Markets & Hostels",
        "roomCount": "90+ rooms",
        "startPrice": "₹4,200/mo",
        "image": "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "madurai-1",
        "title": "Madurai Scholar PG — Twin Share",
        "locality": "KK Nagar, Near Campus",
        "distance": "400m from College Gates",
        "price": 4400,
        "rating": 4.8,
        "reviewsCount": 50,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "madurai-2",
        "title": "Anna Nagar Studio Apartment",
        "locality": "Anna Nagar",
        "distance": "600m from Transit Stop",
        "price": 7000,
        "rating": 4.7,
        "reviewsCount": 30,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "madurai-3",
        "title": "KK Nagar Single Room Flatmate Suite",
        "locality": "KK Nagar, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 5940,
        "rating": 4.8,
        "reviewsCount": 18,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "jabalpur": {
    "name": "Jabalpur",
    "slug": "jabalpur",
    "tier": 2,
    "state": "Madhya Pradesh",
    "tagline": "Madhya Pradesh's Judicial & Technical Education Center",
    "totalRoomsText": "220+ verified rooms in Jabalpur",
    "roomCountNumber": 220,
    "startPrice": "₹4,000",
    "description": "Home to IIITDM Jabalpur, Jabalpur Engineering College (JEC), and RDVV. Serene cantonment-adjacent student neighborhoods.",
    "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Civil Lines • Wright Town",
    "universities": [
      "IIITDM Jabalpur",
      "Jabalpur Engineering College",
      "RDVV Jabalpur"
    ],
    "areas": [
      {
        "id": "civil-lines-jbp",
        "name": "Civil Lines",
        "subtext": "Green Streets • Quiet Study PGs",
        "roomCount": "130+ rooms",
        "startPrice": "₹4,400/mo",
        "image": "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "wright-town",
        "name": "Wright Town",
        "subtext": "Central Transit & Coaching",
        "roomCount": "90+ rooms",
        "startPrice": "₹4,000/mo",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "jabalpur-1",
        "title": "Jabalpur Scholar PG — Twin Share",
        "locality": "Civil Lines, Near Campus",
        "distance": "400m from College Gates",
        "price": 4200,
        "rating": 4.8,
        "reviewsCount": 53,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "jabalpur-2",
        "title": "Wright Town Studio Apartment",
        "locality": "Wright Town",
        "distance": "600m from Transit Stop",
        "price": 6800,
        "rating": 4.7,
        "reviewsCount": 32,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "jabalpur-3",
        "title": "Civil Lines Single Room Flatmate Suite",
        "locality": "Civil Lines, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 5670,
        "rating": 4.8,
        "reviewsCount": 21,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "rajkot": {
    "name": "Rajkot",
    "slug": "rajkot",
    "tier": 2,
    "state": "Gujarat",
    "tagline": "Saurashtra's Commercial Capital & University Center",
    "totalRoomsText": "240+ verified rooms in Rajkot",
    "roomCountNumber": 240,
    "startPrice": "₹4,500",
    "description": "Anchored by Saurashtra University, Marwadi University, and AIIMS Rajkot. Friendly Gujarati neighborhoods with safe student housing.",
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Kalawad Road • University Road",
    "universities": [
      "Saurashtra University",
      "Marwadi University",
      "AIIMS Rajkot"
    ],
    "areas": [
      {
        "id": "kalawad-road",
        "name": "Kalawad Road",
        "subtext": "Modern College Corridors",
        "roomCount": "140+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "university-road",
        "name": "University Road",
        "subtext": "Saurashtra Univ Main Campus",
        "roomCount": "100+ rooms",
        "startPrice": "₹4,500/mo",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "rajkot-1",
        "title": "Rajkot Scholar PG — Twin Share",
        "locality": "Kalawad Road, Near Campus",
        "distance": "400m from College Gates",
        "price": 4600,
        "rating": 4.8,
        "reviewsCount": 31,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 97,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "rajkot-2",
        "title": "University Road Studio Apartment",
        "locality": "University Road",
        "distance": "600m from Transit Stop",
        "price": 7400,
        "rating": 4.7,
        "reviewsCount": 34,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "rajkot-3",
        "title": "Kalawad Road Single Room Flatmate Suite",
        "locality": "Kalawad Road, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6210,
        "rating": 4.8,
        "reviewsCount": 24,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "guwahati": {
    "name": "Guwahati",
    "slug": "guwahati",
    "tier": 2,
    "state": "Assam",
    "tagline": "Gateway to the North East & Premier IIT Hub",
    "totalRoomsText": "310+ verified rooms in Guwahati",
    "roomCountNumber": 310,
    "startPrice": "₹4,800",
    "description": "Home to IIT Guwahati, Gauhati University, Assam Engineering College, and Cotton University. Scenic Brahmaputra valley student living.",
    "image": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Jalukbari • Christian Basti",
    "universities": [
      "IIT Guwahati",
      "Gauhati University",
      "Cotton University",
      "AEC"
    ],
    "areas": [
      {
        "id": "jalukbari",
        "name": "Jalukbari",
        "subtext": "Gauhati Univ & AEC • IITG Ferry",
        "roomCount": "190+ rooms",
        "startPrice": "₹4,800/mo",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "christian-basti",
        "name": "Christian Basti",
        "subtext": "GS Road • Cafes & Modern Flats",
        "roomCount": "120+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "guwahati-1",
        "title": "Guwahati Scholar PG — Twin Share",
        "locality": "Jalukbari, Near Campus",
        "distance": "400m from College Gates",
        "price": 5000,
        "rating": 4.8,
        "reviewsCount": 34,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "guwahati-2",
        "title": "Christian Basti Studio Apartment",
        "locality": "Christian Basti",
        "distance": "600m from Transit Stop",
        "price": 8000,
        "rating": 4.7,
        "reviewsCount": 36,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "guwahati-3",
        "title": "Jalukbari Single Room Flatmate Suite",
        "locality": "Jalukbari, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 6750,
        "rating": 4.8,
        "reviewsCount": 27,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "chandigarh": {
    "name": "Chandigarh",
    "slug": "chandigarh",
    "tier": 2,
    "state": "Punjab & Chandigarh",
    "tagline": "The City Beautiful & Tri-City Campus Hub",
    "totalRoomsText": "540+ verified rooms in Chandigarh",
    "roomCountNumber": 540,
    "startPrice": "₹6,000",
    "description": "Home to Panjab University, PEC, and the famous Sector 34 coaching corridor. Well-planned sectors with tree-lined cycle tracks.",
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Sector 15 • Sector 34",
    "universities": [
      "Panjab University",
      "PEC Chandigarh",
      "Chitkara University",
      "Chandigarh University"
    ],
    "areas": [
      {
        "id": "sector-15",
        "name": "Sector 15",
        "subtext": "Panjab University Campus Perimeter",
        "roomCount": "320+ rooms",
        "startPrice": "₹6,500/mo",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "sector-34",
        "name": "Sector 34",
        "subtext": "Coaching Institute Hub",
        "roomCount": "220+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "chandigarh-1",
        "title": "Chandigarh Scholar PG — Twin Share",
        "locality": "Sector 15, Near Campus",
        "distance": "400m from College Gates",
        "price": 6500,
        "rating": 4.8,
        "reviewsCount": 37,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "chandigarh-2",
        "title": "Sector 34 Studio Apartment",
        "locality": "Sector 34",
        "distance": "600m from Transit Stop",
        "price": 10500,
        "rating": 4.7,
        "reviewsCount": 38,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "chandigarh-3",
        "title": "Sector 15 Single Room Flatmate Suite",
        "locality": "Sector 15, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 8775,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "ranchi": {
    "name": "Ranchi",
    "slug": "ranchi",
    "tier": 2,
    "state": "Jharkhand",
    "tagline": "Jharkhand's Capital & Renowned BIT Mesra Hub",
    "totalRoomsText": "290+ verified rooms in Ranchi",
    "roomCountNumber": 290,
    "startPrice": "₹4,200",
    "description": "Anchored by BIT Mesra, IIM Ranchi, National Law University, and Lalpur coaching corridor. Pleasant hilltop climate and affordable rooms.",
    "image": "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Lalpur • Bariatu",
    "universities": [
      "BIT Mesra",
      "IIM Ranchi",
      "NUSRL Ranchi",
      "Ranchi University"
    ],
    "areas": [
      {
        "id": "lalpur",
        "name": "Lalpur",
        "subtext": "Premier Coaching & Student Street",
        "roomCount": "180+ rooms",
        "startPrice": "₹4,500/mo",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "bariatu",
        "name": "Bariatu",
        "subtext": "RIMS & BIT Mesra Route",
        "roomCount": "110+ rooms",
        "startPrice": "₹4,200/mo",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "ranchi-1",
        "title": "Ranchi Scholar PG — Twin Share",
        "locality": "Lalpur, Near Campus",
        "distance": "400m from College Gates",
        "price": 4400,
        "rating": 4.8,
        "reviewsCount": 40,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "ranchi-2",
        "title": "Bariatu Studio Apartment",
        "locality": "Bariatu",
        "distance": "600m from Transit Stop",
        "price": 7200,
        "rating": 4.7,
        "reviewsCount": 20,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "ranchi-3",
        "title": "Lalpur Single Room Flatmate Suite",
        "locality": "Lalpur, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 5940,
        "rating": 4.8,
        "reviewsCount": 18,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "dehradun": {
    "name": "Dehradun",
    "slug": "dehradun",
    "tier": 2,
    "state": "Uttarakhand",
    "tagline": "Foothill Education Capital & Private University Haven",
    "totalRoomsText": "480+ verified rooms in Dehradun",
    "roomCountNumber": 480,
    "startPrice": "₹5,500",
    "description": "Home to UPES, Graphic Era, DIT University, and FRI. Picturesque Doon valley student hostels and mountain-view shared flats.",
    "image": "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Bidholi • Clement Town",
    "universities": [
      "UPES Dehradun",
      "Graphic Era University",
      "DIT University",
      "IMS Unison"
    ],
    "areas": [
      {
        "id": "bidholi",
        "name": "Bidholi",
        "subtext": "UPES Energy Acres • Student Town",
        "roomCount": "280+ rooms",
        "startPrice": "₹6,000/mo",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "clement-town",
        "name": "Clement Town",
        "subtext": "Graphic Era Campus • Green Suburbs",
        "roomCount": "200+ rooms",
        "startPrice": "₹5,500/mo",
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "dehradun-1",
        "title": "Dehradun Scholar PG — Twin Share",
        "locality": "Bidholi, Near Campus",
        "distance": "400m from College Gates",
        "price": 5800,
        "rating": 4.8,
        "reviewsCount": 43,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "dehradun-2",
        "title": "Clement Town Studio Apartment",
        "locality": "Clement Town",
        "distance": "600m from Transit Stop",
        "price": 9200,
        "rating": 4.7,
        "reviewsCount": 22,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 91,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "dehradun-3",
        "title": "Bidholi Single Room Flatmate Suite",
        "locality": "Bidholi, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7830,
        "rating": 4.8,
        "reviewsCount": 21,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "greater-noida": {
    "name": "Greater Noida",
    "slug": "greater-noida",
    "tier": 2,
    "state": "Uttar Pradesh",
    "tagline": "India's Dedicated 50+ College Campus City & Knowledge Corridor",
    "totalRoomsText": "620+ verified rooms in Greater Noida",
    "roomCountNumber": 620,
    "startPrice": "₹5,800",
    "description": "Anchored by Knowledge Park I, II, III with over 50 top colleges, Sharda University, Galgotias, and Bennett University. Wide expressways and modern hostels.",
    "image": "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Knowledge Park III • Pari Chowk",
    "universities": [
      "Sharda University",
      "Galgotias University",
      "Bennett University",
      "Shiv Nadar University"
    ],
    "areas": [
      {
        "id": "knowledge-park",
        "name": "Knowledge Park III",
        "subtext": "50+ Engineering & Tech Campuses",
        "roomCount": "380+ rooms",
        "startPrice": "₹6,200/mo",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pari-chowk",
        "name": "Pari Chowk / Alpha 1",
        "subtext": "Aqua Line Metro • Commercial Hub",
        "roomCount": "240+ rooms",
        "startPrice": "₹5,800/mo",
        "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "greater-noida-1",
        "title": "Greater Noida Scholar PG — Twin Share",
        "locality": "Knowledge Park III, Near Campus",
        "distance": "400m from College Gates",
        "price": 6000,
        "rating": 4.8,
        "reviewsCount": 46,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "greater-noida-2",
        "title": "Pari Chowk / Alpha 1 Studio Apartment",
        "locality": "Pari Chowk / Alpha 1",
        "distance": "600m from Transit Stop",
        "price": 9500,
        "rating": 4.7,
        "reviewsCount": 24,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "greater-noida-3",
        "title": "Knowledge Park III Single Room Flatmate Suite",
        "locality": "Knowledge Park III, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 8100,
        "rating": 4.8,
        "reviewsCount": 24,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 95,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "manipal": {
    "name": "Manipal",
    "slug": "manipal",
    "tier": 2,
    "state": "Karnataka",
    "tagline": "India's Quintessential University Town & Medical Hub",
    "totalRoomsText": "460+ verified rooms in Manipal",
    "roomCountNumber": 460,
    "startPrice": "₹6,500",
    "description": "Home to MAHE (Manipal Academy of Higher Education), KMC, and MIT Manipal. A vibrant international student town where students comprise the majority of the population.",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Eshwar Nagar • Tiger Circle",
    "universities": [
      "MAHE Manipal",
      "Kasturba Medical College (KMC)",
      "Manipal Institute of Technology (MIT)"
    ],
    "areas": [
      {
        "id": "tiger-circle",
        "name": "Tiger Circle",
        "subtext": "Heart of Manipal • Campus Center",
        "roomCount": "270+ rooms",
        "startPrice": "₹7,200/mo",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "eshwar-nagar",
        "name": "Eshwar Nagar",
        "subtext": "MIT Campus Edge • Student Flats",
        "roomCount": "190+ rooms",
        "startPrice": "₹6,500/mo",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "manipal-1",
        "title": "Manipal Scholar PG — Twin Share",
        "locality": "Tiger Circle, Near Campus",
        "distance": "400m from College Gates",
        "price": 6800,
        "rating": 4.8,
        "reviewsCount": 49,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 97,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "manipal-2",
        "title": "Eshwar Nagar Studio Apartment",
        "locality": "Eshwar Nagar",
        "distance": "600m from Transit Stop",
        "price": 11000,
        "rating": 4.7,
        "reviewsCount": 26,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "manipal-3",
        "title": "Tiger Circle Single Room Flatmate Suite",
        "locality": "Tiger Circle, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 9180,
        "rating": 4.8,
        "reviewsCount": 27,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 96,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "vellore": {
    "name": "Vellore",
    "slug": "vellore",
    "tier": 2,
    "state": "Tamil Nadu",
    "tagline": "India's Premier Engineering Campus City & Medical Core",
    "totalRoomsText": "440+ verified rooms in Vellore",
    "roomCountNumber": 440,
    "startPrice": "₹5,500",
    "description": "Centered around the sprawling VIT Vellore campus (35,000+ students) and Christian Medical College (CMC). High-density student PGs with flexible meal plans.",
    "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Katpadi • Gandhi Nagar",
    "universities": [
      "VIT University Vellore",
      "CMC Vellore",
      "Thiruvalluvar University"
    ],
    "areas": [
      {
        "id": "katpadi",
        "name": "Katpadi",
        "subtext": "VIT Campus Perimeter • Katpadi Jn",
        "roomCount": "290+ rooms",
        "startPrice": "₹5,800/mo",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "gandhi-nagar-vel",
        "name": "Gandhi Nagar",
        "subtext": "CMC Medical Campus • Quiet Enclave",
        "roomCount": "150+ rooms",
        "startPrice": "₹5,500/mo",
        "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "vellore-1",
        "title": "Vellore Scholar PG — Twin Share",
        "locality": "Katpadi, Near Campus",
        "distance": "400m from College Gates",
        "price": 5800,
        "rating": 4.8,
        "reviewsCount": 52,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 92,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "vellore-2",
        "title": "Gandhi Nagar Studio Apartment",
        "locality": "Gandhi Nagar",
        "distance": "600m from Transit Stop",
        "price": 8800,
        "rating": 4.7,
        "reviewsCount": 28,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "vellore-3",
        "title": "Katpadi Single Room Flatmate Suite",
        "locality": "Katpadi, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7830,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  },
  "bhubaneswar": {
    "name": "Bhubaneswar",
    "slug": "bhubaneswar",
    "tier": 2,
    "state": "Odisha",
    "tagline": "Temple City & Eastern India's Emerging Knowledge Corridor",
    "totalRoomsText": "410+ verified rooms in Bhubaneswar",
    "roomCountNumber": 410,
    "startPrice": "₹4,800",
    "description": "Home to KIIT, SOA University, IIT Bhubaneswar, and AIIMS. Planned Smart City sectors with modern student co-living spaces.",
    "image": "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
    "hubs": "Patia • Infocity",
    "universities": [
      "KIIT University",
      "SOA University",
      "IIT Bhubaneswar",
      "AIIMS Bhubaneswar"
    ],
    "areas": [
      {
        "id": "patia",
        "name": "Patia",
        "subtext": "KIIT Square • Student Hub & Cafes",
        "roomCount": "260+ rooms",
        "startPrice": "₹5,200/mo",
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "infocity",
        "name": "Infocity",
        "subtext": "Tech Parks • Modern Co-Living",
        "roomCount": "150+ rooms",
        "startPrice": "₹5,800/mo",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "listings": [
      {
        "id": "bhubaneswar-1",
        "title": "Bhubaneswar Scholar PG — Twin Share",
        "locality": "Patia, Near Campus",
        "distance": "400m from College Gates",
        "price": 5200,
        "rating": 4.8,
        "reviewsCount": 30,
        "roomType": "Double Sharing",
        "category": "PG",
        "verified": true,
        "matchScore": 93,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "High-speed Wi-Fi",
          "Mess Meals Included",
          "Power Backup",
          "Daily Cleaning"
        ]
      },
      {
        "id": "bhubaneswar-2",
        "title": "Infocity Studio Apartment",
        "locality": "Infocity",
        "distance": "600m from Transit Stop",
        "price": 8200,
        "rating": 4.7,
        "reviewsCount": 30,
        "roomType": "Private Studio",
        "category": "Flat",
        "verified": true,
        "matchScore": 90,
        "evaluatedFactors": 6,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Attached Bathroom",
          "Kitchenette",
          "Zero Brokerage",
          "No Lock-in"
        ]
      },
      {
        "id": "bhubaneswar-3",
        "title": "Patia Single Room Flatmate Suite",
        "locality": "Patia, Student Corridor",
        "distance": "750m from Main Transit",
        "price": 7020,
        "rating": 4.8,
        "reviewsCount": 18,
        "roomType": "Single Room in Shared Flat",
        "category": "Flat",
        "verified": true,
        "matchScore": 94,
        "evaluatedFactors": 7,
        "confidence": "High",
        "image": "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
        "amenities": [
          "Furnished",
          "High Speed Wi-Fi",
          "Quiet Study Zone",
          "Zero Brokerage"
        ]
      }
    ]
  }
};

export const CITIES_LIST = Object.values(CITY_CATALOG);

export const STATE_CITY_MAP = {
  "Karnataka": [
    "bengaluru",
    "manipal"
  ],
  "Delhi NCR": [
    "delhi-ncr"
  ],
  "Maharashtra": [
    "pune",
    "mumbai",
    "nagpur",
    "nashik"
  ],
  "Telangana": [
    "hyderabad"
  ],
  "Rajasthan": [
    "kota",
    "jaipur"
  ],
  "Tamil Nadu": [
    "chennai",
    "coimbatore",
    "madurai",
    "vellore"
  ],
  "West Bengal": [
    "kolkata"
  ],
  "Gujarat": [
    "ahmedabad",
    "surat",
    "vadodara",
    "rajkot"
  ],
  "Uttar Pradesh": [
    "lucknow",
    "kanpur",
    "agra",
    "varanasi",
    "greater-noida"
  ],
  "Madhya Pradesh": [
    "indore",
    "bhopal",
    "jabalpur"
  ],
  "Andhra Pradesh": [
    "visakhapatnam"
  ],
  "Bihar": [
    "patna"
  ],
  "Punjab & Chandigarh": [
    "ludhiana",
    "chandigarh"
  ],
  "Kerala": [
    "kochi"
  ],
  "Assam": [
    "guwahati"
  ],
  "Jharkhand": [
    "ranchi"
  ],
  "Uttarakhand": [
    "dehradun"
  ],
  "Odisha": [
    "bhubaneswar"
  ]
};

export const STATES_LIST = Object.keys(STATE_CITY_MAP).sort();

/**
 * Grouping helper according to PRD & user specifications:
 * Group pg_bed + shared_room (Double / Triple Sharing) under "PG",
 * Group private_room + full_flat (Studio / 1BHK / Private Room) under "Flat".
 */
export function getPropertyCategory(roomType = "") {
  const t = roomType.toLowerCase();
  if (
    t.includes("pg") ||
    t.includes("shared") ||
    t.includes("sharing") ||
    t.includes("double") ||
    t.includes("triple") ||
    t.includes("twin")
  ) {
    return "PG";
  }
  return "Flat";
}
