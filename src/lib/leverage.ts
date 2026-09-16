import type { CreateHubInput, Hub, LeverageDay } from "./types";
import { generateSlug } from "./utils";

function daysBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function buildLeverageTable(
  initialBank: number,
  targetOdd: number,
  startDate: Date,
  endDate: Date,
): LeverageDay[] {
  const totalDays = daysBetween(startDate, endDate);
  const days: LeverageDay[] = [];

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i - 1);

    days.push({
      day: i,
      date: date.toISOString().slice(0, 10),
      targetBank: initialBank * Math.pow(targetOdd, i),
      status: "pending",
    });
  }

  return days;
}

export function createHub(input: CreateHubInput): Hub {
  const now = new Date();
  const endDate = new Date(input.endDate);
  const slug = generateSlug();

  const config = {
    id: crypto.randomUUID(),
    slug,
    name: input.name.trim() || "Nossa banca",
    initialBank: input.initialBank,
    targetOdd: input.targetOdd,
    participants: input.participants,
    startDate: now.toISOString().slice(0, 10),
    endDate: input.endDate,
    createdAt: now.toISOString(),
  };

  return {
    ...config,
    days: buildLeverageTable(
      input.initialBank,
      input.targetOdd,
      now,
      endDate,
    ),
  };
}

export function getShareUrl(slug: string): string {
  if (typeof window === "undefined") return `/h/${slug}`;
  return `${window.location.origin}/h/${slug}`;
}
