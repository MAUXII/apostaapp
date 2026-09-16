"use client";

import { motion } from "motion/react";
import { clampHeat } from "@/lib/streak";
import { cn } from "@/lib/utils";

type FlameTheme = {
  outer: string;
  mid: string;
  core: string;
  glow: string;
};

const STOPS: { t: number; outer: string; mid: string; core: string }[] = [
  { t: 0, outer: "#52525b", mid: "#71717a", core: "#d4d4d8" },
  { t: 0.15, outer: "#16a34a", mid: "#4ade80", core: "#dcfce7" },
  { t: 0.3, outer: "#65a30d", mid: "#a3e635", core: "#ecfccb" },
  { t: 0.45, outer: "#ca8a04", mid: "#facc15", core: "#fef9c3" },
  { t: 0.6, outer: "#ea580c", mid: "#fb923c", core: "#ffedd5" },
  { t: 0.75, outer: "#dc2626", mid: "#f87171", core: "#fecaca" },
  { t: 0.88, outer: "#db2777", mid: "#f472b6", core: "#fbcfe8" },
  { t: 1, outer: "#9333ea", mid: "#c084fc", core: "#f3e8ff" },
];

const OUTER =
  "M35 19c0-2.062-.367-4.039-1.04-5.868-.46 5.389-3.333 8.157-6.335 6.868-2.812-1.208-.917-5.917-.777-8.164.236-3.809-.012-8.169-6.931-11.794 2.875 5.5.333 8.917-2.333 9.125-2.958.231-5.667-2.542-4.667-7.042-3.238 2.386-3.332 6.402-2.333 9 1.042 2.708-.042 4.958-2.583 5.208-2.84.28-4.418-3.041-2.963-8.333C2.52 10.965 1 14.805 1 19c0 9.389 7.611 17 17 17s17-7.611 17-17z";

const INNER =
  "M28.394 23.999c.148 3.084-2.561 4.293-4.019 3.709-2.106-.843-1.541-2.291-2.083-5.291s-2.625-5.083-5.708-6c2.25 6.333-1.247 8.667-3.08 9.084-1.872.426-3.753-.001-3.968-4.007C7.352 23.668 6 26.676 6 30c0 .368.023.73.055 1.09C9.125 34.124 13.342 36 18 36s8.875-1.876 11.945-4.91c.032-.36.055-.722.055-1.09 0-2.187-.584-4.236-1.606-6.001z";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function flameTheme(heat: number): FlameTheme {
  const n = clampHeat(heat);
  if (n === 0) {
    return {
      outer: "#52525b",
      mid: "#71717a",
      core: "#d4d4d8",
      glow: "rgba(113,113,122,0.35)",
    };
  }

  const t = n / 20;
  let i = 0;
  while (i < STOPS.length - 2 && STOPS[i + 1].t < t) i += 1;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const local = (t - a.t) / Math.max(0.0001, b.t - a.t);

  const outer = mixHex(a.outer, b.outer, local);
  const mid = mixHex(a.mid, b.mid, local);
  const core = mixHex(a.core, b.core, local);
  const [or, og, ob] = hexToRgb(outer);

  return {
    outer,
    mid,
    core,
    glow: `rgba(${or},${og},${ob},0.55)`,
  };
}

type StreakFlameProps = {
  heat: number;
  className?: string;
  size?: "sm" | "lg";
};

export function StreakFlame({
  heat,
  className,
  size = "lg",
}: StreakFlameProps) {
  const theme = flameTheme(heat);
  const big = size === "lg";
  const n = clampHeat(heat);
  const blink = n === 0 ? 2 : Math.max(0.55, 1.1 - n * 0.02);
  const dimmed = n === 0;

  return (
    <div
      className={cn(
        "relative flex items-end justify-center",
        big ? "h-[4.5rem] w-14" : "h-9 w-7",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 36 36"
        className={cn(
          "relative z-[1] overflow-visible transition-opacity",
          big ? "h-16 w-16" : "h-8 w-8",
          dimmed && "opacity-40 grayscale",
        )}
      >
        <path fill={theme.outer} d={OUTER} />
        <path fill={theme.mid} d={INNER} />
        {!dimmed ? (
          <>
            <motion.ellipse
              cx="18"
              cy="30.5"
              rx="4.2"
              ry="5.5"
              fill={theme.core}
              animate={{ opacity: [0.35, 1, 0.4] }}
              transition={{
                duration: blink,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="14.5"
              cy="14"
              r="1.6"
              fill="#fff"
              animate={{ opacity: [0.1, 0.55, 0.12] }}
              transition={{
                duration: blink * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}

export function flameColor(heat: number): string {
  return flameTheme(heat).outer;
}
