# Basera Design System & Visual Specification (`design.md`)

## 1. Creative Direction & Brand Philosophy

**Basera** (Hindi/Urdu for *"a place to settle"*, a sanctuary or nest) is an AI-assisted roommate and student housing matching platform designed for university students and young professionals relocating to new cities across India.

### Visual Recalibration: Energetic Confidence Benchmarked Against FindMyHostel
Recalibrated away from pale, muted pastel washes toward high visual confidence, punchy color blocks, and structural energy:

- **Bold, Saturated Color Blocks (Not Pale Washes):** The hero uses a genuinely vivid, confident azure/royal blue band (`#0284C7` → `#0369A1` → `#0A58F6`) as a solid color band that reads as "definitely blue" at a glance.
- **Structural Wave Break:** The vivid hero blue band transitions into the light canvas below via an organic SVG wave shape break cutting into the white section below it (not a flat horizontal line).
- **Bold Rounded Floating Card Overlapping Two Sections:** The search experience is anchored by a large, prominent rounded card (`border-radius: 28px`, deep elevated shadow `0 24px 60px rgba(0, 32, 96, 0.22)`) that straddles the seam between the vivid hero band and the city section below it.
- **Colorful, Confident Badges (Not Muted Chips):**
  - **Match Score & Harmony Badges:** Confident, saturated vivid orange (`#FF6B00` to `#EA580C`) with pure `#FFFFFF` white text and subtle glow.
  - **Verified Badges:** Bright, confident emerald green (`#10B981`) with pure `#FFFFFF` white text and checkmark.
  - **Featured Badges:** Vibrant warm amber (`#F59E0B` to `#D97706`) with pure `#FFFFFF` white text.
- **Visual Personality (Tasteful Graphic Silhouette):** An architectural campus and urban skyline vector silhouette is integrated into the hero background layer, breaking up plain "photos + text" while maintaining modern polish.
- **Bolder Typographic Scale:** Hero headlines scale up to `clamp(2.75rem, 5.2vw, 4.4rem)` with weight 800 and glowing warm italic serif accents (`#FDBA74`).
- **Auth Screen Theme Rule:** The dark/light mode toggle exists **ONLY** in the main homepage navbar. Auth screens (`Login.jsx`, `Signup.jsx`, `ForgotPassword.jsx`, `EmailVerification.jsx`) strictly inherit the active theme without displaying any toggle controls.

---

## 2. Color System & Design Tokens

Basera uses CSS Custom Properties with automatic theme-switching via `[data-theme="light"]` and `[data-theme="dark"]`.

### Light Mode (Default)
| Token Name | Value | Purpose |
|---|---|---|
| `--bg-canvas` | `#F7F9FD` | Clean canvas with faint cool undertone |
| `--bg-surface` | `#FFFFFF` | Card & container surface for clean contrast |
| `--bg-surface-elevated` | `#FFFFFF` | Modals, dropdowns, floating search card |
| `--bg-surface-subtle` | `#F0F3F9` | Inner input wells, disabled tracks |
| `--text-primary` | `#182030` | Deep navy-charcoal ink (high contrast) |
| `--text-secondary` | `#4B5872` | Slate grey-blue for subtitles |
| `--text-muted` | `#7C8BA6` | Captions, timestamps, metadata labels |
| `--hero-vivid-gradient` | `linear-gradient(145deg, #0284C7 0%, #0369A1 40%, #0A58F6 100%)` | Saturated azure hero color block |
| `--accent-primary` | `#0A58F6` | Vivid royal blue for buttons & active states |
| `--accent-primary-hover` | `#0843BA` | Deeper royal navy on hover |
| `--badge-match` | `linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)` | Confident saturated orange with white text |
| `--badge-verified` | `#10B981` | Confident emerald green with white text |
| `--badge-featured` | `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)` | Amber featured badge with white text |
| `--border-subtle` | `rgba(28, 35, 51, 0.08)` | Soft framing for cards and inputs |
| `--border-focus` | `rgba(10, 88, 246, 0.40)` | Focus ring tone |
| `--shadow-sm` | `0 2px 8px rgba(28, 35, 51, 0.04)` | Subtle element elevation |
| `--shadow-md` | `0 8px 24px rgba(28, 35, 51, 0.06)` | Standard card elevation |
| `--shadow-lg` | `0 16px 40px rgba(28, 35, 51, 0.08)` | Standard elevated cards |
| `--shadow-overlap-search` | `0 24px 60px rgba(0, 32, 96, 0.22)` | Bold floating search card elevation |

### Dark Mode (`[data-theme="dark"]`)
| Token Name | Value | Purpose |
|---|---|---|
| `--bg-canvas` | `#0B0F19` | Deep midnight navy-black |
| `--bg-surface` | `#131B2E` | Dark navy surface for cards and panels |
| `--bg-surface-elevated` | `#1B253D` | Elevated dark components |
| `--bg-surface-subtle` | `#1A2338` | Dark input wells and tab backgrounds |
| `--text-primary` | `#F1F5F9` | Crisp off-white |
| `--text-secondary` | `#94A3B8` | Light slate blue for secondary text |
| `--text-muted` | `#64748B` | Subdued metadata |
| `--hero-vivid-gradient` | `linear-gradient(145deg, #034A96 0%, #022F6E 45%, #091D47 100%)` | Deep royal night hero block |
| `--accent-primary` | `#38BDF8` | Luminous sky blue |
| `--badge-match` | `linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)` | Saturated orange with white text |
| `--badge-verified` | `#10B981` | Emerald green with white text |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Muted white border |
| `--shadow-overlap-search` | `0 24px 60px rgba(0, 0, 0, 0.5)` | Dark floating search card elevation |

---

## 3. Typography Hierarchy

### Font Families
1. **Primary Sans (Grotesk):** `Plus Jakarta Sans`, system-ui, sans-serif
   - Weight spectrum: 400 (Body), 500 (Medium UI), 600 (Semibold UI), 700/800 (Bold headlines).
2. **Signature Accent Serif:** `Instrument Serif`, Georgia, serif
   - Style: *Italic*, 400 weight.
   - Usage Rule: **One word or short 2-word phrase per headline**, rendered in glowing warm peach (`#FDBA74`) on vivid blue backgrounds or royal blue on white backgrounds.
3. **Data Monospace:** `JetBrains Mono`, monospace
   - Weight: 600 / 700.
   - Usage Rule: Currency figures (`₹8,500`), match rates (`94%`), distances (`800m`), and stats counters (`14,200+`).

### Scale & Hierarchy
| Role | Font Family | Size / Line Height | Tracking | Weight |
|---|---|---|---|---|
| Display Hero | Plus Jakarta Sans | `clamp(2.75rem, 5.2vw, 4.4rem)` / 1.1 | `-0.035em` | 800 (Extrabold) |
| Display Accent Word | Instrument Serif | `clamp(3rem, 5.8vw, 4.8rem)` / 1.1 | `0` | 400 (Italic) |
| Section Headline (H2)| Plus Jakarta Sans | `clamp(1.8rem, 3.5vw, 2.6rem)` / 1.2 | `-0.02em` | 700 (Bold) |
| Subsection Title (H3)| Plus Jakarta Sans | `1.25rem` (20px) / 1.4 | `-0.01em` | 700 (Bold) |
| Body Lead / Subtitle | Plus Jakarta Sans | `1.125rem` (18px) / 1.6 | `-0.005em`| 400 (Regular) |
| Body Text | Plus Jakarta Sans | `0.95rem` (15px) / 1.6 | `0` | 400 (Regular) |
| Micro / Badge | Plus Jakarta Sans | `0.78rem` (12.5px) / 1.3 | `+0.01em` | 700 (Bold) |
| Numbers / Prices | JetBrains Mono | `1.125rem` – `2.8rem` | `-0.02em`| 700 (Bold) |

---

## 4. Component Design Specs

### A. Vivid Hero Band with Structural Wave Cut & Townscape Illustration
- **Background:** Saturated azure color block (`linear-gradient(145deg, #0284C7 0%, #0369A1 40%, #0A58F6 100%)`).
- **Layered Townscape & Student Arrival Illustration (`HeroIllustration.jsx`):**
  - **Multi-layer Depth:** Atmospheric sunset gradient glow (`#sunsetGlow`), soft drifting clouds, soaring bird flock, low-opacity distant campus towers, and solid mid-ground student residences.
  - **Authentic Indian Architectural Details:**
    - Rooftop black ribbed Sintex water tanks with white lids and PVC pipes.
    - Traditional Jharokha arched window balconies with stone corbels and railings.
    - Rajput/Mughal Chhatri pavilion dome with 4 slender pillars, curved eaves, and kalash finial.
    - Celebratory festive triangular bunting flags strung between rooftops.
    - Rooftop parabolic satellite dishes (Tata Play / Airtel style) and AC outdoor units.
    - Ground-floor student chai cafe with vibrant orange & cream striped awning.
  - **Iconic Indian Auto-Rickshaw:** Parked on the street curb with classic green lower body, bright yellow curved canopy roof, round headlamp, and cast headlight beam.
  - **Friendly Student Character:** Modern flat-editorial illustration of an arriving student with backpack and rolling orange hard-shell trolley suitcase, stepping forward with optimism.
- **Wave Shape Divider:** Organic SVG wave shape break cutting into the light canvas below (`viewBox="0 0 1440 90"`).
- **Hero Two-Column Content:**
  - **Left Column:** Live admissions pill with pulsating emerald dot, extrabold white headline with glowing peach italic serif accent word, high-contrast subtext, and three white trust checkmark lines.
  - **Right Column:** Prominent 490px photo box showcasing authentic Indian student room photography drenched in natural golden light, overlayed by a floating verified badge and a floating 94% match-score card with avatars and factor progress bar.

### B. Bold Floating Search Card Overlapping Two Sections
- **Positioning:** Straddles the boundary between the vivid hero band and the city section below (`margin: 3.2rem auto -58px auto`, `z-index: 25`).
- **Container:** `border-radius: 28px`, background `var(--bg-surface)`, elevated shadow `0 24px 60px rgba(0, 32, 96, 0.22)`, border `1px solid var(--border-subtle)`.
- **Category Tabs:** Quick filter pills ("All Accommodations", "Twin Sharing", "Private Single", "Girls PG", "Boys PG", "Near Metro").
- **Search Fields Grid:**
  1. 📍 Target Education Hub / City select.
  2. 🎓 Campus / Locality text search.
  3. 💰 Interactive Max Budget slider with live `₹/mo` monospace readout.
  4. Search Rooms primary button with search icon.

### C. Confident Saturated Badges
- **Verified Badge:** `#10B981` solid emerald green background with `#FFFFFF` text and white checkmark icon.
- **Match Score Badge:** `linear-gradient(135deg, #FF6B00 0%, #EA580C 100%)` solid vivid orange with `#FFFFFF` text and monospace percentage.
- **Featured Badge:** `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)` amber with `#FFFFFF` text.

### D. Sticky Glass Navbar
- Glass frosted blur (`rgba(247, 249, 253, 0.88)` + backdrop-filter `blur(16px)`).
- Contains: Basera brand mark, navigation anchors, **Theme Toggle button (sole location on site)**, Sign In link, and Get Started pill CTA.

### E. City Auto-Scroller Carousel
- Infinite horizontal marquee with 6 verified student hubs: Delhi NCR, Bengaluru, Pune, Mumbai, Hyderabad, Kota.
- Room count chip in confident saturated orange with white text.
- Interactive: Clicking any city card dynamically filters the live listings below.
- Top padding set to `5.5rem` to provide generous breathing space for the overlapping search card.

### F. OYO/Airbnb-Style Room Listings
- Real student photography with `.curated-photo` grading.
- High-contrast badges on top of image (Verified PG in solid emerald, Match Score in solid orange).
- Pricing in prominent JetBrains Mono (`₹8,500/mo`).
- Direct "View Details" and "Connect" pill actions.

### G. Matching Engine Compatibility Breakdown
- Mirroring the actual 7-factor weighted scoring engine from `server/services/matchingEngine.js`:
  1. Cleanliness & Chores (25%)
  2. Sleep Schedule & Chronotype (20%)
  3. Smoking & Drinking Tolerance (20%)
  4. Food & Dietary Preferences (15%)
  5. Guest & Gathering Comfort (10%)
  6. City & Campus Proximity (5%)
  7. Budget & Deposit Alignment (5%)
- Transparent Factor Coverage & Confidence:
  - Displays real metadata: `"83% Match • Based on 5 of 7 factors (Medium Confidence)"` and `"94% Match • Based on 7 of 7 factors (High Confidence)"`.
  - Fair score normalization explained for unstated non-critical factors.

### H. Trust Stats Band & Dawn CTA
- Solid royal blue stats band (`linear-gradient(135deg, #0E44C4 0%, #092E8C 100%)`) with animated count-up counters (14,200+ students, 3,850+ rooms, 48+ campuses, 4.9/5.0 rating).
- Elevated CTA card with deep blue gradient and white/orange button actions.

### I. Auth Screens (Login, Signup, ForgotPassword, EmailVerification)
- Centered auth card with 28px radius, Basera branding, and pill segmented tabs.
- **Inherits current active theme** from document state.
- **Zero theme toggle controls** visible on any auth view.
- Provides clean "← Back to Homepage" return button.

---

## 5. Curated Photography & Filter Rules
- **Student Rooms:** Authentic Indian PG setups, natural light, study desks, clean interiors.
- **City Hubs:** Authentic urban infrastructure only (metro corridors, modern tech parks, residential streets).
- **Strict Prohibition on Tourist Monuments:** Zero monument or tourism postcard imagery anywhere on the site (no Gateway of India, no India Gate).