import type { DayStatus, LeverageDay } from "./types";

export type StreakSnapshot = {
  streak: number;
  heat: number;
  metToday: boolean;
  greens: number;
  reds: number;
};

const MAX_HEAT = 20;

export function streakToHeat(streak: number): number {
  if (streak <= 0) return 0;
  return Math.min(MAX_HEAT, Math.ceil(streak * 1.5));
}

export function buildStreakSnapshot(days: LeverageDay[]): StreakSnapshot {
  const resolved = days.filter((d) => d.status !== "pending");
  const greens = resolved.filter((d) => d.status === "green").length;
  const reds = resolved.filter((d) => d.status === "red").length;

  let streak = 0;
  for (let i = resolved.length - 1; i >= 0; i--) {
    if (resolved[i].status === "green") streak++;
    else break;
  }

  const today = new Date().toISOString().slice(0, 10);
  const todayEntry = days.find((d) => d.date === today);
  const metToday = todayEntry?.status === "green";

  return {
    streak,
    heat: streakToHeat(streak),
    metToday,
    greens,
    reds,
  };
}

export function streakLabel(streak: number): string {
  if (streak === 0) return "Zerado";
  if (streak < 3) return "Esquentando";
  if (streak < 7) return "No ritmo";
  if (streak < 14) return "Sólido";
  return "Absurdo";
}

export function clampHeat(heat: number): number {
  return Math.max(0, Math.min(MAX_HEAT, heat));
}

export type { DayStatus };
