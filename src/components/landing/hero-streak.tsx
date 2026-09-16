"use client";

import { motion } from "motion/react";
import { StreakFlame, flameColor } from "@/components/gamification/streak-flame";
import { buildStreakSnapshot } from "@/lib/streak";
import type { LeverageDay } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type HeroStreakProps = {
  days: LeverageDay[];
};

export function HeroStreak({ days }: HeroStreakProps) {
  const { streak, heat } = buildStreakSnapshot(days);
  const latest = days.filter((d) => d.status === "green").at(-1);
  const color = flameColor(heat);

  return (
    <div className="relative flex flex-col items-center py-2">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: color, opacity: heat > 0 ? 0.22 : 0.06 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <StreakFlame heat={heat} size="lg" className="scale-125" />
      </motion.div>

      <div className="relative mt-2 text-center">
        <p className="font-mono text-5xl font-semibold tabular-nums tracking-tighter text-white">
          {streak}
        </p>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
          dias green seguidos
        </p>
      </div>

      {latest ? (
        <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs tabular-nums text-white/55">
            banca {formatCurrency(latest.targetBank)}
          </span>
        </div>
      ) : null}
    </div>
  );
}
