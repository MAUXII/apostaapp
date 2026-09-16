"use client";

import { buildStreakSnapshot, streakLabel } from "@/lib/streak";
import type { LeverageDay } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StreakFlame } from "./streak-flame";

type StreakBadgeProps = {
  days: LeverageDay[];
  size?: "sm" | "lg";
  showLabel?: boolean;
  className?: string;
};

export function StreakBadge({
  days,
  size = "lg",
  showLabel = true,
  className,
}: StreakBadgeProps) {
  const { streak, heat } = buildStreakSnapshot(days);

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          size === "lg" ? "size-14" : "size-10",
        )}
      >
        <StreakFlame heat={heat} size={size === "lg" ? "lg" : "sm"} />
      </div>

      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/30">
          Sequência green
        </p>
        <p className="aa-display text-xl font-semibold tabular-nums leading-none text-white">
          {streak}
          <span className="ml-1 text-xs font-normal text-white/45">dias</span>
        </p>
        {showLabel ? (
          <p className="mt-0.5 text-[11px] text-white/35">{streakLabel(streak)}</p>
        ) : null}
      </div>
    </div>
  );
}
