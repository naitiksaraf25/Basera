// Basera Distinctive Brand Logo Mark
// Specially engineered to stay crisp, legible, and memorable at navbar sizes (28px - 40px)
// Symbolism:
// 1. Sleek protective roof canopy (Shelter / "Basera")
// 2. Warm inner hearth arch (Home, comfort, belonging)
// 3. Central living spark (Two lives coming together in one space)

export function BaseraLogo({ size = 32, variant = "default" }) {
  const roofGradId = `baseraRoofGrad-${size}`;
  const hearthGradId = `baseraHearthGrad-${size}`;
  const sparkGradId = `baseraSparkGrad-${size}`;

  const isWhite = variant === "white";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={roofGradId}
          x1="3"
          y1="5"
          x2="29"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0A58F6" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        <linearGradient
          id={hearthGradId}
          x1="9"
          y1="12"
          x2="23"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient
          id={sparkGradId}
          x1="13"
          y1="17"
          x2="19"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFB703" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>

      {/* 1. Primary Shelter Gable Roofline (Clean, bold, aerodynamic) */}
      <path
        d="M3.5 15.5L16 4.5L28.5 15.5"
        stroke={isWhite ? "#FFFFFF" : `url(#${roofGradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Welcoming Inner Hearth Arch / Home Structure */}
      <path
        d="M9.5 27V18.2C9.5 14.6 12.4 11.8 16 11.8C19.6 11.8 22.5 14.6 22.5 18.2V27"
        stroke={isWhite ? "rgba(255,255,255,0.85)" : `url(#${hearthGradId})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Central Hearth Spark / Living Dot (Two lives united) */}
      <circle
        cx="16"
        cy="20.5"
        r="2.4"
        fill={isWhite ? "#FFFFFF" : `url(#${sparkGradId})`}
      />
    </svg>
  );
}

