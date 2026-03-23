"use client"

import { motion } from "framer-motion"

const floatVariants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
}

const coinVariants = (delay: number) => ({
  animate: {
    y: [0, -8, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 2.8 + delay * 0.4, repeat: Infinity, ease: "easeInOut", delay },
  },
})

export default function PiggyBank() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Floating coins */}
      <motion.div
        variants={coinVariants(0)}
        animate="animate"
        className="absolute top-[12%] right-[8%]"
      >
        <Coin size={52} shade="light" label="€50" />
      </motion.div>

      <motion.div
        variants={coinVariants(0.6)}
        animate="animate"
        className="absolute top-[28%] right-[2%]"
      >
        <Coin size={40} shade="medium" label="€10" />
      </motion.div>

      <motion.div
        variants={coinVariants(1.1)}
        animate="animate"
        className="absolute top-[8%] right-[32%]"
      >
        <Coin size={36} shade="dark" label="€5" />
      </motion.div>

      <motion.div
        variants={coinVariants(0.3)}
        animate="animate"
        className="absolute bottom-[30%] right-[4%]"
      >
        <Coin size={44} shade="light" label="€20" />
      </motion.div>

      <motion.div
        variants={coinVariants(0.9)}
        animate="animate"
        className="absolute bottom-[18%] right-[22%]"
      >
        <Coin size={32} shade="medium" label="€2" />
      </motion.div>

      {/* Main piggy bank */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="relative z-10 drop-shadow-2xl"
      >
        <PigSvg />
      </motion.div>
    </div>
  )
}

/* ── Coin ─────────────────────────────────────────────── */
function Coin({ size, shade, label }: { size: number; shade: "light" | "medium" | "dark"; label: string }) {
  const colors = {
    light:  { face: "#f5d87a", rim: "#c9a227", shine: "#fef3c0", text: "#7c5c00" },
    medium: { face: "#d4af37", rim: "#a07820", shine: "#fde68a", text: "#5a3d00" },
    dark:   { face: "#b8922a", rim: "#7c5c14", shine: "#f5d87a", text: "#3b2600" },
  }
  const c = colors[shade]
  const r = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <defs>
        <radialGradient id={`cg-${shade}-${size}`} cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor={c.shine} />
          <stop offset="100%" stopColor={c.face} />
        </radialGradient>
      </defs>
      {/* rim */}
      <circle cx={r} cy={r} r={r} fill={c.rim} />
      {/* face */}
      <circle cx={r} cy={r} r={r - size * 0.07} fill={`url(#cg-${shade}-${size})`} />
      {/* label */}
      <text
        x={r}
        y={r + size * 0.1}
        textAnchor="middle"
        fontSize={size * 0.28}
        fontWeight="700"
        fontFamily="sans-serif"
        fill={c.text}
      >
        {label}
      </text>
    </svg>
  )
}

/* ── Pig SVG ──────────────────────────────────────────── */
function PigSvg() {
  return (
    <svg
      width="280"
      height="260"
      viewBox="0 0 280 260"
      fill="none"
      aria-label="Hucha en forma de cerdo"
      role="img"
    >
      <defs>
        {/* Body gradient */}
        <radialGradient id="bodyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e9b8f5" />
          <stop offset="100%" stopColor="#c17fe0" />
        </radialGradient>
        {/* Belly gradient */}
        <radialGradient id="bellyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f3d6fb" />
          <stop offset="100%" stopColor="#dda0f0" />
        </radialGradient>
        {/* Cheek gradient */}
        <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7a8d4" />
          <stop offset="100%" stopColor="#e06db0" />
        </radialGradient>
        {/* Shadow */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#7e22ce" floodOpacity="0.35" />
        </filter>
        {/* Slot highlight */}
        <linearGradient id="slotGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>

      <g filter="url(#shadow)">
        {/* Tail */}
        <path
          d="M228 130 C248 120, 258 105, 245 95 C232 85, 220 100, 235 108"
          stroke="#c17fe0"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ear left */}
        <ellipse cx="90" cy="70" rx="20" ry="26" fill="#c17fe0" transform="rotate(-15 90 70)" />
        <ellipse cx="90" cy="72" rx="12" ry="17" fill="#f3a8d4" transform="rotate(-15 90 72)" />

        {/* Ear right */}
        <ellipse cx="170" cy="68" rx="20" ry="26" fill="#c17fe0" transform="rotate(12 170 68)" />
        <ellipse cx="170" cy="70" rx="12" ry="17" fill="#f3a8d4" transform="rotate(12 170 70)" />

        {/* Main body */}
        <ellipse cx="140" cy="155" rx="95" ry="82" fill="url(#bodyGrad)" />

        {/* Belly */}
        <ellipse cx="138" cy="168" rx="55" ry="44" fill="url(#bellyGrad)" />

        {/* Head */}
        <circle cx="140" cy="98" r="58" fill="url(#bodyGrad)" />

        {/* Coin slot on top */}
        <rect x="122" y="58" width="36" height="9" rx="4.5" fill="url(#slotGrad)" />
        <rect x="124" y="59" width="32" height="5" rx="2.5" fill="#3b0764" opacity="0.5" />

        {/* Snout */}
        <ellipse cx="140" cy="122" rx="30" ry="22" fill="#dda0f0" />
        <ellipse cx="130" cy="122" rx="8" ry="10" fill="#9333ea" opacity="0.35" />
        <ellipse cx="150" cy="122" rx="8" ry="10" fill="#9333ea" opacity="0.35" />

        {/* Nostrils */}
        <ellipse cx="130" cy="123" rx="5" ry="6" fill="#7e22ce" />
        <ellipse cx="150" cy="123" rx="5" ry="6" fill="#7e22ce" />

        {/* Eyes */}
        <circle cx="116" cy="98" r="11" fill="white" />
        <circle cx="164" cy="98" r="11" fill="white" />
        <circle cx="118" cy="99" r="7" fill="#3b0764" />
        <circle cx="166" cy="99" r="7" fill="#3b0764" />
        {/* Eye shine */}
        <circle cx="120" cy="96" r="2.5" fill="white" />
        <circle cx="168" cy="96" r="2.5" fill="white" />

        {/* Smile */}
        <path
          d="M124 112 Q140 124 156 112"
          stroke="#7e22ce"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cheeks */}
        <ellipse cx="103" cy="112" rx="13" ry="9" fill="url(#cheekGrad)" opacity="0.75" />
        <ellipse cx="177" cy="112" rx="13" ry="9" fill="url(#cheekGrad)" opacity="0.75" />

        {/* Legs */}
        <rect x="92" y="218" width="26" height="30" rx="10" fill="#c17fe0" />
        <rect x="126" y="222" width="26" height="28" rx="10" fill="#c17fe0" />
        <rect x="160" y="222" width="26" height="28" rx="10" fill="#c17fe0" />
        <rect x="194" y="218" width="26" height="30" rx="10" fill="#c17fe0" />
      </g>
    </svg>
  )
}
