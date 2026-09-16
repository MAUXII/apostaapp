import type { DayStatus, Hub } from "./types";

const STORAGE_KEY = "apostaapp:hubs";

function readAll(): Record<string, Hub> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Hub>) : {};
  } catch {
    return {};
  }
}

function writeAll(hubs: Record<string, Hub>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hubs));
}

export function saveHub(hub: Hub): void {
  const hubs = readAll();
  hubs[hub.slug] = hub;
  writeAll(hubs);
}

export function getHub(slug: string): Hub | null {
  return readAll()[slug] ?? null;
}

export function listHubs(): Hub[] {
  return Object.values(readAll()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function updateDayStatus(
  slug: string,
  dayNumber: number,
  status: DayStatus,
): Hub | null {
  const hub = getHub(slug);
  if (!hub) return null;

  const updated: Hub = {
    ...hub,
    days: hub.days.map((d) =>
      d.day === dayNumber ? { ...d, status } : d,
    ),
  };

  saveHub(updated);
  return updated;
}
