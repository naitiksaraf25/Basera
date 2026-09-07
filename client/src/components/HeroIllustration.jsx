// Basera Hero Townscape & Student Arrival Custom Illustration
// Modern editorial flat illustration crafted specifically for Basera
// Features authentic Indian student housing architecture: Sintex rooftop tanks, jharokha balconies,
// chhatri dome, bunting flags, satellite dish, auto-rickshaw, and a student arriving with rolling luggage.

export function HeroIllustration() {
  return (
    <div className="hero-illustration-wrapper" aria-hidden="true">
      <svg
        className="hero-illustration-svg"
        viewBox="0 0 1440 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYBottom meet"
      >
        <defs>
          {/* Sunset Horizon Glow */}
          <radialGradient
            id="sunsetGlow"
            cx="50%"
            cy="100%"
            r="60%"
            fx="50%"
            fy="100%"
          >
            <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FB923C" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0A58F6" stopOpacity="0" />
          </radialGradient>

          {/* Warm Window Glow */}
          <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
          </radialGradient>

          {/* Rickshaw Headlight Beam */}
          <linearGradient
            id="headlightBeam"
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </linearGradient>

          {/* Building Facade Gradients */}
          <linearGradient id="buildingCream" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          <linearGradient
            id="buildingTerracotta"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#E05252" />
          </linearGradient>

          <linearGradient id="buildingAmber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="buildingSand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>

          <linearGradient id="buildingSlate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* ============================================================ */}
        {/* 1. ATMOSPHERIC BACKDROP: SUNSET GLOW & CLOUDS & BIRDS */}
        {/* ============================================================ */}
        <rect x="0" y="40" width="1440" height="250" fill="url(#sunsetGlow)" />

        {/* Soft Stylized Clouds */}
        <g opacity="0.45">
          {/* Cloud Left */}
          <path
            d="M 180 85 C 180 74 189 65 200 65 C 205 52 218 43 232 43 C 248 43 261 54 265 68 C 274 69 282 77 282 87 C 282 97 274 105 264 105 L 198 105 C 188 105 180 96 180 85 Z"
            fill="#FFFFFF"
          />
          {/* Cloud Center */}
          <path
            d="M 680 60 C 680 50 688 42 698 42 C 703 32 714 25 727 25 C 742 25 754 35 757 48 C 765 49 772 56 772 65 C 772 74 765 82 756 82 L 696 82 C 687 82 680 72 680 60 Z"
            fill="#FFFFFF"
          />
          {/* Cloud Right */}
          <path
            d="M 1180 75 C 1180 66 1187 59 1196 59 C 1200 48 1210 41 1222 41 C 1235 41 1246 50 1249 62 C 1256 63 1262 70 1262 78 C 1262 86 1256 93 1248 93 L 1195 93 C 1187 93 1180 85 1180 75 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* Flock of Indian Mynas / Pigeons Soaring Across Sunset Sky */}
        <g
          opacity="0.65"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        >
          {/* Bird 1 */}
          <path d="M 520 72 Q 528 64 536 71 Q 544 64 552 72" />
          {/* Bird 2 */}
          <path d="M 548 58 Q 554 51 560 57 Q 566 51 572 58" />
          {/* Bird 3 */}
          <path d="M 575 76 Q 581 70 587 75 Q 593 70 599 76" />
          {/* Bird 4 */}
          <path d="M 880 50 Q 888 43 896 49 Q 904 43 912 50" />
          {/* Bird 5 */}
          <path d="M 910 64 Q 916 58 922 63 Q 928 58 934 64" />
        </g>

        {/* ============================================================ */}
        {/* 2. DISTANT ARCHITECTURE LAYER (Soft Depth, Low Opacity) */}
        {/* ============================================================ */}
        <g opacity="0.28" fill="#FFFFFF">
          {/* Far Left Campus Tower */}
          <rect x="120" y="110" width="45" height="155" rx="3" />
          <polygon points="120,110 142.5,75 165,110" />

          {/* Far High-rise Block */}
          <rect x="240" y="90" width="70" height="175" rx="4" />
          <rect x="250" y="105" width="8" height="12" rx="1" fill="#0A58F6" />
          <rect x="265" y="105" width="8" height="12" rx="1" fill="#0A58F6" />
          <rect x="280" y="105" width="8" height="12" rx="1" fill="#0A58F6" />
          <rect x="295" y="105" width="8" height="12" rx="1" fill="#0A58F6" />

          {/* Far Radio / Telecom Tower */}
          <g stroke="#FFFFFF" strokeWidth="1.2" fill="none">
            <line x1="330" y1="130" x2="350" y2="50" />
            <line x1="370" y1="130" x2="350" y2="50" />
            <line x1="350" y1="50" x2="350" y2="35" />
            <line x1="336" y1="110" x2="364" y2="110" />
            <line x1="341" y1="90" x2="359" y2="90" />
            <line x1="346" y1="70" x2="354" y2="70" />
            <circle cx="350" cy="33" r="2" fill="#FFFFFF" />
          </g>

          {/* Center Far University Dome */}
          <path d="M 690 140 C 690 100 750 100 750 140 Z" />
          <rect x="680" y="140" width="80" height="125" />
          <polygon points="718,100 720,82 722,100" />
          <circle cx="720" cy="80" r="2" />

          {/* Far Right Residential Highrises */}
          <rect x="1040" y="95" width="55" height="170" rx="3" />
          <rect x="1110" y="120" width="50" height="145" rx="3" />
          <rect x="1220" y="80" width="65" height="185" rx="3" />
          {/* Slanted roofs */}
          <polygon points="1220,80 1252.5,58 1285,80" />
        </g>

        {/* ============================================================ */}
        {/* 3. MID-GROUND LAYER: AUTHENTIC INDIAN STUDENT NEIGHBORHOOD */}
        {/* ============================================================ */}

        {/* --- LEFT WING BUILDINGS (x = 30 to 420) --- */}

        {/* Building L1: Warm Terracotta 3-Story Student PG */}
        <g id="building-L1">
          {/* Main Block */}
          <rect
            x="40"
            y="125"
            width="125"
            height="140"
            rx="6"
            fill="url(#buildingTerracotta)"
          />
          {/* Roof Parapet */}
          <rect x="36" y="121" width="133" height="8" rx="3" fill="#991B1B" />

          {/* Sintex Rooftop Black Water Tank (Iconic Indian Detail!) */}
          <g id="sintex-tank-L1">
            <rect x="60" y="96" width="30" height="25" rx="4" fill="#0F172A" />
            {/* Rib rings */}
            <line
              x1="60"
              y1="103"
              x2="90"
              y2="103"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <line
              x1="60"
              y1="110"
              x2="90"
              y2="110"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <line
              x1="60"
              y1="117"
              x2="90"
              y2="117"
              stroke="#475569"
              strokeWidth="1.5"
            />
            {/* White lid */}
            <ellipse cx="75" cy="96" rx="11" ry="3" fill="#E2E8F0" />
            {/* PVC inlet pipe */}
            <path
              d="M 88 108 L 98 108 L 98 125"
              stroke="#CBD5E1"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Rooftop Satellite Dish (Tata Play / Airtel) */}
          <g id="satellite-dish-L1">
            <line
              x1="125"
              y1="121"
              x2="128"
              y2="105"
              stroke="#334155"
              strokeWidth="2"
            />
            <path
              d="M 120 95 Q 128 102 134 108"
              stroke="#E2E8F0"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <line
              x1="127"
              y1="102"
              x2="134"
              y2="97"
              stroke="#64748B"
              strokeWidth="1.5"
            />
          </g>

          {/* Jharokha Balcony on Floor 2 */}
          <g id="jharokha-balcony">
            {/* Corbel supports */}
            <polygon points="85,192 90,202 98,192" fill="#B91C1C" />
            <polygon points="115,192 122,202 127,192" fill="#B91C1C" />
            {/* Balcony box */}
            <rect
              x="80"
              y="165"
              width="52"
              height="27"
              rx="3"
              fill="#FFFBEB"
              stroke="#B91C1C"
              strokeWidth="1.5"
            />
            {/* Jharokha Scalloped Arch window cutout */}
            <path
              d="M 93 165 C 93 155 119 155 119 165 Z"
              fill="url(#windowGlow)"
            />
            {/* Balustrade railing lines */}
            <line
              x1="84"
              y1="178"
              x2="128"
              y2="178"
              stroke="#B91C1C"
              strokeWidth="1.2"
            />
            <line
              x1="90"
              y1="178"
              x2="90"
              y2="192"
              stroke="#B91C1C"
              strokeWidth="1"
            />
            <line
              x1="98"
              y1="178"
              x2="98"
              y2="192"
              stroke="#B91C1C"
              strokeWidth="1"
            />
            <line
              x1="106"
              y1="178"
              x2="106"
              y2="192"
              stroke="#B91C1C"
              strokeWidth="1"
            />
            <line
              x1="114"
              y1="178"
              x2="114"
              y2="192"
              stroke="#B91C1C"
              strokeWidth="1"
            />
            <line
              x1="122"
              y1="178"
              x2="122"
              y2="192"
              stroke="#B91C1C"
              strokeWidth="1"
            />
            {/* Chajja awning above arch */}
            <path d="M 88 155 L 124 155 L 128 158 L 84 158 Z" fill="#991B1B" />
          </g>

          {/* Ground Floor Windows & Entrance */}
          <rect
            x="55"
            y="140"
            width="20"
            height="25"
            rx="3"
            fill="url(#windowGlow)"
          />
          <rect x="55" y="215" width="22" height="32" rx="3" fill="#FFFBEB" />
          <rect
            x="60"
            y="222"
            width="12"
            height="25"
            rx="2"
            fill="#0A58F6"
            opacity="0.6"
          />
          {/* AC Outdoor Unit with Fan Grille */}
          <rect
            x="135"
            y="145"
            width="18"
            height="14"
            rx="2"
            fill="#F1F5F9"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          <circle cx="144" cy="152" r="4" fill="#64748B" />
        </g>

        {/* Building L2: Cream & Ochre Student Hostel with Balconies */}
        <g id="building-L2">
          {/* Main Block */}
          <rect
            x="180"
            y="105"
            width="115"
            height="160"
            rx="6"
            fill="url(#buildingCream)"
          />
          {/* Brick Trim Bands */}
          <rect x="180" y="155" width="115" height="4" fill="#D97706" />
          <rect x="180" y="205" width="115" height="4" fill="#D97706" />
          <rect x="176" y="100" width="123" height="7" rx="3" fill="#78350F" />

          {/* Rooftop Water Tank on Raised Stand */}
          <g id="tank-stand-L2">
            <line
              x1="200"
              y1="100"
              x2="200"
              y2="85"
              stroke="#334155"
              strokeWidth="2"
            />
            <line
              x1="218"
              y1="100"
              x2="218"
              y2="85"
              stroke="#334155"
              strokeWidth="2"
            />
            <line
              x1="198"
              y1="85"
              x2="220"
              y2="85"
              stroke="#334155"
              strokeWidth="2"
            />
            <rect x="195" y="65" width="28" height="20" rx="3" fill="#1E293B" />
            <line
              x1="195"
              y1="72"
              x2="223"
              y2="72"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <ellipse cx="209" cy="65" rx="9" ry="2.5" fill="#E2E8F0" />
          </g>

          {/* Windows with warm student study light */}
          <rect
            x="195"
            y="118"
            width="18"
            height="26"
            rx="2"
            fill="url(#windowGlow)"
            stroke="#78350F"
            strokeWidth="1"
          />
          <rect
            x="228"
            y="118"
            width="18"
            height="26"
            rx="2"
            fill="url(#windowGlow)"
            stroke="#78350F"
            strokeWidth="1"
          />
          <rect
            x="260"
            y="118"
            width="18"
            height="26"
            rx="2"
            fill="url(#windowGlow)"
            stroke="#78350F"
            strokeWidth="1"
          />

          {/* Balcony with Plant Pots */}
          <rect
            x="195"
            y="168"
            width="85"
            height="26"
            rx="3"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="1.2"
          />
          <line
            x1="195"
            y1="176"
            x2="280"
            y2="176"
            stroke="#D97706"
            strokeWidth="1"
          />
          {/* Potted Plants */}
          <polygon points="200,168 202,162 208,162 210,168" fill="#B45309" />
          <circle cx="205" cy="159" r="4" fill="#10B981" />
          <polygon points="265,168 267,162 273,162 275,168" fill="#B45309" />
          <circle cx="270" cy="158" r="5" fill="#059669" />
        </g>

        {/* Building L3: Student Chai / Cafe Shop with Striped Awning */}
        <g id="building-L3">
          <rect
            x="310"
            y="135"
            width="105"
            height="130"
            rx="5"
            fill="url(#buildingSand)"
          />
          {/* Slanted Tile Roof on Top */}
          <polygon points="305,135 362.5,115 420,135" fill="#B45309" />

          {/* Upper Window */}
          <rect
            x="330"
            y="145"
            width="22"
            height="28"
            rx="3"
            fill="url(#windowGlow)"
            stroke="#78350F"
            strokeWidth="1"
          />
          <rect
            x="370"
            y="145"
            width="22"
            height="28"
            rx="3"
            fill="url(#windowGlow)"
            stroke="#78350F"
            strokeWidth="1"
          />

          {/* Striped Chai / Snacks Awning */}
          <g id="chai-awning">
            <polygon points="315,190 410,190 418,205 307,205" fill="#FF6B00" />
            {/* White / Cream Stripes */}
            <polygon points="325,190 338,190 335,205 321,205" fill="#FFFBEB" />
            <polygon points="352,190 365,190 363,205 349,205" fill="#FFFBEB" />
            <polygon points="379,190 392,190 391,205 377,205" fill="#FFFBEB" />
            {/* Scalloped edge */}
            <path
              d="M 307 205 Q 312 210 317 205 Q 322 210 327 205 Q 332 210 337 205 Q 342 210 347 205 Q 352 210 357 205 Q 362 210 367 205 Q 372 210 377 205 Q 382 210 387 205 Q 392 210 397 205 Q 402 210 407 205 Q 412 210 418 205"
              fill="#FF6B00"
            />
          </g>

          {/* Cafe Door and Warm Welcome Board */}
          <rect x="335" y="210" width="30" height="55" rx="3" fill="#78350F" />
          <rect
            x="340"
            y="218"
            width="20"
            height="25"
            rx="2"
            fill="url(#windowGlow)"
          />
          {/* Signboard: "CHAI & PG" */}
          <rect
            x="375"
            y="215"
            width="32"
            height="16"
            rx="2"
            fill="#FFFBEB"
            stroke="#78350F"
            strokeWidth="1"
          />
          <text
            x="391"
            y="226"
            fontSize="7"
            fontWeight="700"
            fill="#EA580C"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            CHAI
          </text>
        </g>

        {/* --- CELEBRATORY BUNTING FLAGS (Stringing Buildings Together) --- */}
        <g id="festoon-flags">
          {/* Left string from Building L1 to Building L2 */}
          <path
            d="M 160 128 Q 230 148 310 138"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Triangular Pennants */}
          <polygon points="180,135 188,148 194,137" fill="#FF6B00" />
          <polygon points="204,140 212,154 218,143" fill="#38BDF8" />
          <polygon points="228,145 236,158 242,146" fill="#10B981" />
          <polygon points="252,146 260,158 266,145" fill="#FBBF24" />
          <polygon points="276,143 284,155 290,141" fill="#F43F5E" />

          {/* Right string across to Chhatri Pavilion */}
          <path
            d="M 1120 125 Q 1180 142 1250 130"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            fill="none"
          />
          <polygon points="1140,131 1148,144 1154,133" fill="#38BDF8" />
          <polygon points="1164,136 1172,149 1178,138" fill="#FF6B00" />
          <polygon points="1188,139 1196,152 1202,139" fill="#FBBF24" />
          <polygon points="1212,138 1220,150 1226,136" fill="#10B981" />
          <polygon points="1234,134 1241,146 1246,132" fill="#F43F5E" />
        </g>

        {/* --- RIGHT WING BUILDINGS (x = 1080 to 1420) --- */}

        {/* Building R1: Modern Student Apartments with Corner Balconies */}
        <g id="building-R1">
          <rect
            x="1080"
            y="115"
            width="135"
            height="150"
            rx="6"
            fill="url(#buildingCream)"
          />
          {/* Rooftop Terraced Garden Parapet */}
          <rect x="1076" y="110" width="143" height="7" rx="3" fill="#0F766E" />
          <circle cx="1090" cy="106" r="4" fill="#10B981" />
          <circle cx="1102" cy="104" r="5" fill="#059669" />
          <circle cx="1114" cy="106" r="4" fill="#34D399" />

          {/* Balcony 1 */}
          <rect
            x="1095"
            y="130"
            width="45"
            height="30"
            rx="3"
            fill="#F0FDFA"
            stroke="#0D9488"
            strokeWidth="1.2"
          />
          <line
            x1="1095"
            y1="140"
            x2="1140"
            y2="140"
            stroke="#0D9488"
            strokeWidth="1"
          />
          <line
            x1="1105"
            y1="140"
            x2="1105"
            y2="160"
            stroke="#0D9488"
            strokeWidth="1"
          />
          <line
            x1="1118"
            y1="140"
            x2="1118"
            y2="160"
            stroke="#0D9488"
            strokeWidth="1"
          />
          <line
            x1="1130"
            y1="140"
            x2="1130"
            y2="160"
            stroke="#0D9488"
            strokeWidth="1"
          />

          {/* Windows with Study Lights */}
          <rect
            x="1160"
            y="132"
            width="22"
            height="26"
            rx="2"
            fill="url(#windowGlow)"
            stroke="#0F766E"
            strokeWidth="1"
          />
          <rect
            x="1160"
            y="175"
            width="22"
            height="26"
            rx="2"
            fill="url(#windowGlow)"
            stroke="#0F766E"
            strokeWidth="1"
          />

          {/* Balcony 2 */}
          <rect
            x="1095"
            y="175"
            width="45"
            height="30"
            rx="3"
            fill="#F0FDFA"
            stroke="#0D9488"
            strokeWidth="1.2"
          />
          <line
            x1="1095"
            y1="185"
            x2="1140"
            y2="185"
            stroke="#0D9488"
            strokeWidth="1"
          />
          <line
            x1="1105"
            y1="185"
            x2="1105"
            y2="205"
            stroke="#0D9488"
            strokeWidth="1"
          />
          <line
            x1="1118"
            y1="185"
            x2="1118"
            y2="205"
            stroke="#0D9488"
            strokeWidth="1"
          />
          <line
            x1="1130"
            y1="185"
            x2="1130"
            y2="205"
            stroke="#0D9488"
            strokeWidth="1"
          />
        </g>

        {/* Building R2: Authentic Indian Chhatri Pavilion & Sandstone Residence */}
        <g id="building-R2">
          {/* Main Stone Facade */}
          <rect
            x="1245"
            y="125"
            width="150"
            height="140"
            rx="6"
            fill="url(#buildingSand)"
          />
          {/* Cornice Line */}
          <rect x="1240" y="120" width="160" height="6" rx="2" fill="#9A3412" />

          {/* THE CHHATRI DOME (Indian Architectural Signature) */}
          <g id="chhatri-dome">
            {/* Base platform */}
            <rect
              x="1265"
              y="112"
              width="60"
              height="8"
              rx="2"
              fill="#C2410C"
            />
            {/* 4 Slender Pillars */}
            <rect x="1270" y="80" width="4" height="32" fill="#EA580C" />
            <rect x="1285" y="80" width="4" height="32" fill="#EA580C" />
            <rect x="1301" y="80" width="4" height="32" fill="#EA580C" />
            <rect x="1316" y="80" width="4" height="32" fill="#EA580C" />
            {/* Slanted Chajja (Eaves) */}
            <polygon points="1260,80 1330,80 1324,74 1266,74" fill="#9A3412" />
            {/* Rajput / Mughal Curved Dome */}
            <path
              d="M 1266 74 C 1266 48 1295 45 1295 38 C 1295 45 1324 48 1324 74 Z"
              fill="url(#buildingAmber)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            {/* Kalash / Finial Spire */}
            <polygon points="1293,38 1295,26 1297,38" fill="#D97706" />
            <circle cx="1295" cy="24" r="2.5" fill="#FBBF24" />
          </g>

          {/* Rooftop Sintex Water Tank R2 */}
          <g id="sintex-tank-R2">
            <rect
              x="1348"
              y="98"
              width="28"
              height="22"
              rx="3"
              fill="#0F172A"
            />
            <line
              x1="1348"
              y1="104"
              x2="1376"
              y2="104"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <line
              x1="1348"
              y1="110"
              x2="1376"
              y2="110"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <ellipse cx="1362" cy="98" rx="9" ry="2.5" fill="#E2E8F0" />
          </g>

          {/* Jharokha Arched Window Pair */}
          <path
            d="M 1270 160 C 1270 148 1295 148 1295 160 L 1295 180 L 1270 180 Z"
            fill="url(#windowGlow)"
            stroke="#9A3412"
            strokeWidth="1.2"
          />
          <path
            d="M 1315 160 C 1315 148 1340 148 1340 160 L 1340 180 L 1315 180 Z"
            fill="url(#windowGlow)"
            stroke="#9A3412"
            strokeWidth="1.2"
          />
          {/* Ground Floor Arched Entrance Gate */}
          <path
            d="M 1290 265 L 1290 215 C 1290 198 1325 198 1325 215 L 1325 265 Z"
            fill="#78350F"
          />
          <circle cx="1308" cy="235" r="2" fill="#FBBF24" />
        </g>

        {/* ============================================================ */}
        {/* 4. FOREGROUND STREET LAYER: CHARACTER & AUTO-RICKSHAW */}
        {/* ============================================================ */}

        {/* Paved Street Ground Line */}
        <line
          x1="0"
          y1="265"
          x2="1440"
          y2="265"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="3"
        />
        <rect
          x="0"
          y="266"
          width="1440"
          height="24"
          fill="rgba(255, 255, 255, 0.08)"
        />

        {/* --- ICONIC INDIAN AUTO-RICKSHAW (Parked at x = 970 to 1060) --- */}
        <g id="auto-rickshaw">
          {/* Headlight Beam spreading left onto the ground */}
          <polygon
            points="972,242 890,230 880,265 972,252"
            fill="url(#headlightBeam)"
          />

          {/* Yellow Canopy Roof */}
          <path
            d="M 975 224 C 980 210 995 206 1020 206 L 1055 206 C 1060 206 1065 212 1065 224 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.5"
          />

          {/* Windshield & Frame */}
          <polygon
            points="975,224 990,224 992,238 977,238"
            fill="rgba(255, 255, 255, 0.65)"
            stroke="#1E293B"
            strokeWidth="1"
          />

          {/* Green Lower Metallic Body */}
          <path
            d="M 972 238 L 1068 238 C 1070 238 1072 242 1070 252 L 1065 255 L 975 255 C 972 255 970 248 972 238 Z"
            fill="#16A34A"
            stroke="#15803D"
            strokeWidth="1.2"
          />

          {/* Side Cutout & Passenger Seat Silhouette */}
          <rect
            x="1000"
            y="226"
            width="45"
            height="18"
            rx="2"
            fill="#064E3B"
            opacity="0.75"
          />
          {/* Driver Handlebars */}
          <line
            x1="988"
            y1="236"
            x2="994"
            y2="236"
            stroke="#0F172A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Headlamp */}
          <circle
            cx="972"
            cy="245"
            r="4"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="1"
          />

          {/* Front Wheel */}
          <g id="front-wheel">
            <circle cx="985" cy="258" r="9" fill="#1E293B" />
            <circle cx="985" cy="258" r="4.5" fill="#94A3B8" />
            <circle cx="985" cy="258" r="2" fill="#1E293B" />
          </g>

          {/* Rear Wheel */}
          <g id="rear-wheel">
            <circle cx="1052" cy="258" r="9" fill="#1E293B" />
            <circle cx="1052" cy="258" r="4.5" fill="#94A3B8" />
            <circle cx="1052" cy="258" r="2" fill="#1E293B" />
          </g>

          {/* Black Mudguard */}
          <path
            d="M 975 256 C 975 250 995 250 995 256"
            stroke="#0F172A"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 1042 256 C 1042 250 1062 250 1062 256"
            stroke="#0F172A"
            strokeWidth="2.5"
            fill="none"
          />
        </g>

        {/* Vintage Streetlamp Post */}
        <g id="streetlamp">
          <line
            x1="950"
            y1="265"
            x2="950"
            y2="185"
            stroke="#1E293B"
            strokeWidth="2.5"
          />
          {/* Base */}
          <polygon points="946,265 954,265 952,258 948,258" fill="#1E293B" />
          {/* Curved Bracket */}
          <path
            d="M 950 190 C 950 180 940 180 940 188"
            stroke="#1E293B"
            strokeWidth="2"
            fill="none"
          />
          {/* Lantern Head */}
          <polygon
            points="936,188 944,188 946,198 934,198"
            fill="#FEF08A"
            stroke="#1E293B"
            strokeWidth="1"
          />
          <circle cx="940" cy="193" r="3" fill="#F59E0B" />
        </g>

        {/* --- FRIENDLY STUDENT CHARACTER ARRIVING IN NEW CITY (x = 425 to 480) --- */}
        <g id="student-character">
          {/* Rolling Suitcase (Behind student) */}
          <g id="rolling-suitcase">
            {/* Telescoping Handle */}
            <line
              x1="428"
              y1="222"
              x2="445"
              y2="208"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="430"
              y1="220"
              x2="447"
              y2="206"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="443"
              y1="205"
              x2="449"
              y2="210"
              stroke="#1E293B"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Suitcase Body (Vibrant Basera Orange) */}
            <rect
              x="414"
              y="222"
              width="20"
              height="32"
              rx="4"
              fill="#FF6B00"
              stroke="#EA580C"
              strokeWidth="1.2"
              transform="rotate(-8 424 238)"
            />
            {/* Hard-shell texture grooves */}
            <line
              x1="419"
              y1="228"
              x2="433"
              y2="226"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="418"
              y1="234"
              x2="432"
              y2="232"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="417"
              y1="240"
              x2="431"
              y2="238"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Rolling Caster Wheels */}
            <circle cx="417" cy="260" r="2.8" fill="#0F172A" />
            <circle cx="429" cy="258" r="2.8" fill="#0F172A" />
          </g>
          {/* Student's Stride & Legs */}
          {/* Back Leg (Left) */}
          <line
            x1="462"
            y1="230"
            x2="452"
            y2="255"
            stroke="#334155"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <ellipse cx="450" cy="258" rx="4.5" ry="2.5" fill="#FFFFFF" />{" "}
          {/* Shoe */}
          {/* Front Leg (Right - Stepping Forward) */}
          <line
            x1="464"
            y1="230"
            x2="472"
            y2="254"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <ellipse cx="474" cy="257" rx="5" ry="2.5" fill="#FFFFFF" />{" "}
          {/* Shoe */}
          {/* Backpack on Shoulders */}
          <rect
            x="450"
            y="196"
            width="10"
            height="20"
            rx="4"
            fill="#0D9488"
            stroke="#042F2E"
            strokeWidth="1"
          />
          <ellipse cx="452" cy="208" rx="2" ry="4" fill="#F59E0B" />{" "}
          {/* Strap detail */}
          {/* Torso / Casual Jacket */}
          <path
            d="M 458 195 C 464 193 470 195 471 202 L 468 230 L 458 230 Z"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="1"
          />
          {/* Left Arm Extending Back to Luggage Handle */}
          <path
            d="M 460 200 L 447 210"
            stroke="#D4A373"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="447" cy="210" r="2" fill="#D4A373" /> {/* Hand */}
          {/* Right Arm Swinging Forward with Optimism */}
          <path
            d="M 468 200 L 474 212"
            stroke="#2563EB"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="475" cy="214" r="2.2" fill="#D4A373" /> {/* Hand */}
          {/* Neck & Friendly Head */}
          <line
            x1="464"
            y1="195"
            x2="465"
            y2="190"
            stroke="#D4A373"
            strokeWidth="3.5"
          />
          <circle cx="466" cy="184" r="6.5" fill="#D4A373" />
          {/* Hair */}
          <path
            d="M 461 183 C 461 176 472 176 473 182 C 472 185 464 187 461 183 Z"
            fill="#1E293B"
          />
        </g>
      </svg>
    </div>
  );
}
