// City Data Catalog for Basera
// Authentic Indian Student Hubs & Localities

export const CITY_CATALOG = {
  bengaluru: {
    name: "Bengaluru",
    slug: "bengaluru",
    tagline: "India's Silicon Valley & Premier Student Innovation Hub",
    totalRoomsText: "1,340+ verified rooms in Bengaluru",
    roomCountNumber: 1340,
    startPrice: "₹7,200",
    description:
      "Home to Christ University, IISc, NIFT, and top tech parks. Explore verified, zero-brokerage student flats and co-living spaces across Koramangala, HSR, and Indiranagar.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    hubs: "Koramangala • HSR Layout • Electronic City • Indiranagar",
    universities: [
      "Christ University (Main & BGR)",
      "IISc Bengaluru",
      "PES University",
      "NIFT Bengaluru",
      "St. Joseph's University",
    ],
    areas: [
      {
        id: "koramangala",
        name: "Koramangala",
        subtext: "Christ University • Startup Hub",
        roomCount: "480+ rooms",
        startPrice: "₹9,500/mo",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "hsr-layout",
        name: "HSR Layout",
        subtext: "NIFT • Tech Corridors • Tree-lined Sectors",
        roomCount: "340+ rooms",
        startPrice: "₹8,800/mo",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "indiranagar",
        name: "Indiranagar",
        subtext: "Purple Metro Line • 100ft Road • Cafes",
        roomCount: "260+ rooms",
        startPrice: "₹11,000/mo",
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "electronic-city",
        name: "Electronic City",
        subtext: "PES South • Tech Innovation Corridor",
        roomCount: "260+ rooms",
        startPrice: "₹7,200/mo",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      },
    ],
    listings: [
      {
        id: "blr-1",
        title: "Indiranagar Urban Living",
        locality: "Indiranagar, Near 100ft Road",
        distance: "400m from CMH Road Metro Station",
        price: 11000,
        rating: 4.8,
        reviewsCount: 68,
        roomType: "Private Studio",
        verified: true,
        matchScore: 92,
        evaluatedFactors: 7,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "High-speed Wi-Fi",
          "Attached Washroom",
          "Cook on Request",
          "No Lock-in",
        ],
      },
      {
        id: "blr-2",
        title: "Koramangala 5th Block Scholar PG",
        locality: "Koramangala, 5th Block",
        distance: "600m from Christ University Main Gate",
        price: 9500,
        rating: 4.9,
        reviewsCount: 54,
        roomType: "Double Sharing",
        verified: true,
        matchScore: 95,
        evaluatedFactors: 7,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Wi-Fi 200Mbps",
          "Power Backup",
          "North/South Meals",
          "Daily Housekeeping",
        ],
      },
      {
        id: "blr-3",
        title: "HSR Sector 2 Co-Living Suite",
        locality: "HSR Layout, Sector 2",
        distance: "1.1 km from NIFT Campus",
        price: 8800,
        rating: 4.7,
        reviewsCount: 42,
        roomType: "Twin Sharing",
        verified: true,
        matchScore: 91,
        evaluatedFactors: 6,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Air Conditioning",
          "Washing Machine",
          "Study Desks",
          "Biometric Lock",
        ],
      },
      {
        id: "blr-4",
        title: "Electronic City Tech Haven PG",
        locality: "Electronic City, Phase 1",
        distance: "800m from PES South Campus",
        price: 7200,
        rating: 4.8,
        reviewsCount: 39,
        roomType: "Triple Sharing",
        verified: true,
        matchScore: 94,
        evaluatedFactors: 7,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "3 Meals Included",
          "Gym Access",
          "24/7 Hot Water",
          "Study Lounge",
        ],
      },
    ],
  },
  "delhi-ncr": {
    name: "Delhi NCR",
    slug: "delhi-ncr",
    tagline: "Heart of University Culture • DU, IIT, and Knowledge Parks",
    totalRoomsText: "1,240+ verified rooms in Delhi NCR",
    roomCountNumber: 1240,
    startPrice: "₹6,000",
    description:
      "Hudson Lane, North Campus, South Campus, and Noida Knowledge Park. Verified student housing with direct Delhi Metro connectivity.",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=80",
    hubs: "North Campus • Hudson Lane • South Campus • Noida",
    universities: [
      "Delhi University",
      "IIT Delhi",
      "Amity Noida",
      "JNU",
      "Ashoka University",
    ],
    areas: [
      {
        id: "north-campus",
        name: "North Campus",
        subtext: "Hudson Lane • DU North",
        roomCount: "520+ rooms",
        startPrice: "₹7,500/mo",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "south-campus",
        name: "South Campus",
        subtext: "Satya Niketan • DU South",
        roomCount: "380+ rooms",
        startPrice: "₹8,000/mo",
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "noida",
        name: "Noida Knowledge Park",
        subtext: "Amity & Jaypee Sector 62",
        roomCount: "340+ rooms",
        startPrice: "₹6,000/mo",
        image:
          "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=600&q=80",
      },
    ],
    listings: [
      {
        id: "del-1",
        title: "Greenwood Residency — Double Suite",
        locality: "North Campus, Hudson Lane",
        distance: "400m from Delhi University Metro",
        price: 8500,
        rating: 4.9,
        reviewsCount: 42,
        roomType: "Double Sharing",
        verified: true,
        matchScore: 96,
        evaluatedFactors: 7,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Wi-Fi 100Mbps",
          "AC",
          "Daily Housekeeping",
          "Power Backup",
        ],
      },
    ],
  },
  pune: {
    name: "Pune",
    slug: "pune",
    tagline: "Oxford of the East • Academic Excellence & Vibrant Culture",
    totalRoomsText: "840+ verified rooms in Pune",
    roomCountNumber: 840,
    startPrice: "₹5,500",
    description:
      "Kothrud, Viman Nagar, and FC Road student clusters. Close to MIT World Peace University, Symbiosis, and COEP.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    hubs: "Kothrud • Viman Nagar • FC Road • Hinjewadi",
    universities: [
      "MIT WPU",
      "Symbiosis International",
      "COEP Tech",
      "Fergusson College",
    ],
    areas: [
      {
        id: "kothrud",
        name: "Kothrud",
        subtext: "Ideal Colony • MIT WPU",
        roomCount: "320+ rooms",
        startPrice: "₹6,500/mo",
        image:
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "viman-nagar",
        name: "Viman Nagar",
        subtext: "Symbiosis Campus • Cafes",
        roomCount: "290+ rooms",
        startPrice: "₹7,500/mo",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "fc-road",
        name: "FC Road & Deccan",
        subtext: "Fergusson • BMCC Zone",
        roomCount: "230+ rooms",
        startPrice: "₹6,000/mo",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      },
    ],
    listings: [
      {
        id: "pun-1",
        title: "Kothrud Scholars PG",
        locality: "Kothrud, Ideal Colony",
        distance: "800m from MIT World Peace Univ",
        price: 6800,
        rating: 4.9,
        reviewsCount: 35,
        roomType: "Double Sharing",
        verified: true,
        matchScore: 94,
        evaluatedFactors: 6,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Pure Veg Mess",
          "Study Library Desk",
          "Solar Water",
          "CCTV 24/7",
        ],
      },
    ],
  },
  mumbai: {
    name: "Mumbai",
    slug: "mumbai",
    tagline: "The Dream City • IIT Bombay, NMIMS, and Coastal Living",
    totalRoomsText: "650+ verified rooms in Mumbai",
    roomCountNumber: 650,
    startPrice: "₹10,500",
    description:
      "Powai, Vile Parle, and Bandra West. Modern student studios and flats within easy reach of top university hubs.",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    hubs: "Powai • Vile Parle • Bandra West",
    universities: [
      "IIT Bombay",
      "NMIMS Mumbai",
      "St. Xavier's College",
      "Mithibai College",
    ],
    areas: [
      {
        id: "powai",
        name: "Powai",
        subtext: "IIT Bombay • Hiranandani",
        roomCount: "280+ rooms",
        startPrice: "₹12,500/mo",
        image:
          "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "vile-parle",
        name: "Vile Parle",
        subtext: "NMIMS • Mithibai Hub",
        roomCount: "220+ rooms",
        startPrice: "₹14,000/mo",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "bandra",
        name: "Bandra West",
        subtext: "Suburban Vibrance • Hill Road",
        roomCount: "150+ rooms",
        startPrice: "₹15,000/mo",
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      },
    ],
    listings: [
      {
        id: "mum-1",
        title: "Powai Lakeside Student Studio",
        locality: "Powai, Hiranandani Gardens",
        distance: "1.5 km from IIT Bombay Main Gate",
        price: 14500,
        rating: 4.7,
        reviewsCount: 51,
        roomType: "Private Balcony Room",
        verified: true,
        matchScore: 89,
        evaluatedFactors: 7,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "AC Included",
          "Gym Access",
          "2-Wheeler Parking",
          "High Security",
        ],
      },
    ],
  },
  hyderabad: {
    name: "Hyderabad",
    slug: "hyderabad",
    tagline: "Cyberabad • UoH, IIIT, and Gachibowli Tech Corridor",
    totalRoomsText: "590+ verified rooms in Hyderabad",
    roomCountNumber: 590,
    startPrice: "₹6,500",
    description:
      "Gachibowli, Madhapur, and Hitec City. Modern co-living spaces with high-speed fiber and zero brokerage.",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    hubs: "Gachibowli • Madhapur • Hitec City",
    universities: [
      "University of Hyderabad",
      "IIIT Hyderabad",
      "ISB",
      "Osmania University",
    ],
    areas: [
      {
        id: "gachibowli",
        name: "Gachibowli",
        subtext: "UoH • Financial District",
        roomCount: "260+ rooms",
        startPrice: "₹7,500/mo",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "madhapur",
        name: "Madhapur",
        subtext: "Avasa Corridor • Metro",
        roomCount: "190+ rooms",
        startPrice: "₹8,000/mo",
        image:
          "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "hitec-city",
        name: "Hitec City",
        subtext: "Cyber Towers • Tech Hub",
        roomCount: "140+ rooms",
        startPrice: "₹8,500/mo",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      },
    ],
    listings: [
      {
        id: "hyd-1",
        title: "Hitec Valley Co-Living",
        locality: "Gachibowli, Telecom Nagar",
        distance: "900m from University of Hyderabad",
        price: 7900,
        rating: 4.8,
        reviewsCount: 29,
        roomType: "Triple Sharing",
        verified: true,
        matchScore: 91,
        evaluatedFactors: 6,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Fast Wi-Fi",
          "3 Meals Included",
          "Biometric Entry",
          "Laundromat",
        ],
      },
    ],
  },
  kota: {
    name: "Kota",
    slug: "kota",
    tagline: "India's Premier Coaching Capital • Focused Study Living",
    totalRoomsText: "720+ verified rooms in Kota",
    roomCountNumber: 720,
    startPrice: "₹5,000",
    description:
      "Landmark City, Rajiv Gandhi Nagar, and Vigyan Nagar. Quiet, sound-insulated student rooms near Allen and top institutes.",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    hubs: "Landmark City • Rajiv Gandhi Nagar • Vigyan Nagar",
    universities: ["Allen Career Institute", "Resonance", "Motion Education"],
    areas: [
      {
        id: "landmark-city",
        name: "Landmark City",
        subtext: "Allen Samarth • Kunhari",
        roomCount: "380+ rooms",
        startPrice: "₹6,000/mo",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "rajiv-gandhi-nagar",
        name: "Rajiv Gandhi Nagar",
        subtext: "Near City Center",
        roomCount: "210+ rooms",
        startPrice: "₹5,500/mo",
        image:
          "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "vigyan-nagar",
        name: "Vigyan Nagar",
        subtext: "Coaching Parks",
        roomCount: "130+ rooms",
        startPrice: "₹5,000/mo",
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
      },
    ],
    listings: [
      {
        id: "kot-1",
        title: "Allen Corner Aspirational Stay",
        locality: "Landmark City, Kunhari",
        distance: "300m from Landmark Coaching Park",
        price: 6200,
        rating: 4.9,
        reviewsCount: 88,
        roomType: "Single Study Room",
        verified: true,
        matchScore: 95,
        evaluatedFactors: 7,
        confidence: "High",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        amenities: [
          "Sound-insulated",
          "Doctor On-Call",
          "Biometric Attendance",
          "Healthy Mess",
        ],
      },
    ],
  },
};

export const CITIES_LIST = Object.values(CITY_CATALOG);
