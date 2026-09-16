"use client";

import type { DayStatus, LeverageDay } from "@/lib/types";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const STATUS_OPTIONS: { value: DayStatus; label: string }[] = [
  { value: "pending", label: "Pendente" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
];

type DailyCheckinListProps = {
  days: LeverageDay[];
  onStatusChange: (dayNumber: number, status: DayStatus) => void;
};

export function DailyCheckinList({
  days,
  onStatusChange,
}: DailyCheckinListProps) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-[0.08em] text-white/28">
        Check-in diário
      </p>

      <div className="overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
        {days.map((day, i) => {
          const isToday = day.date === today;

          return (
            <div key={day.day}>
              {i > 0 ? <div className="ml-4 h-px bg-white/[0.06]" /> : null}
              <div
                className={cn(
                  "space-y-3 px-4 py-3.5",
                  isToday && "bg-white/[0.02]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[15px] text-white/90">
                      Dia {day.day}
                      {isToday ? (
                        <span className="ml-2 text-[11px] text-white/35">
                          hoje
                        </span>
                      ) : (
                        <span className="ml-2 text-[11px] text-white/35">
                          {formatDate(new Date(day.date))}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 font-mono text-xs tabular-nums text-white/40">
                      meta {formatCurrency(day.targetBank)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 rounded-lg bg-white/[0.03] p-0.5 ring-1 ring-white/[0.05]">
                  {STATUS_OPTIONS.map((opt) => {
                    const active = day.status === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onStatusChange(day.day, opt.value)}
                        className={cn(
                          "flex-1 rounded-md py-1.5 text-[11px] font-medium transition-colors",
                          active && opt.value === "green" && "bg-emerald-500/20 text-emerald-400",
                          active && opt.value === "red" && "bg-red-500/15 text-red-400",
                          active && opt.value === "pending" && "bg-white/[0.08] text-white/80",
                          !active && "text-white/35 hover:text-white/55",
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
