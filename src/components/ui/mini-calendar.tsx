"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

const WEEKDAYS = ["S", "T", "Q", "Q", "S", "S", "D"] as const;

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function monthStartOffset(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

function toIso(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

type MiniCalendarProps = {
  value: string;
  min?: string;
  onChange: (value: string) => void;
};

export function MiniCalendar({ value, min, onChange }: MiniCalendarProps) {
  const initial = parseIso(value);
  const [viewYear, setViewYear] = useState(initial.year);
  const [viewMonth, setViewMonth] = useState(initial.month);

  const today = useMemo(() => {
    const n = new Date();
    return toIso(n.getFullYear(), n.getMonth(), n.getDate());
  }, []);

  const cells = useMemo(() => {
    const total = daysInMonth(viewYear, viewMonth);
    const offset = monthStartOffset(viewYear, viewMonth);
    const list: (number | null)[] = [];
    for (let i = 0; i < offset; i++) list.push(null);
    for (let d = 1; d <= total; d++) list.push(d);
    return list;
  }, [viewYear, viewMonth]);

  function shiftMonth(delta: number) {
    let y = viewYear;
    let m = viewMonth + delta;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewYear(y);
    setViewMonth(m);
  }

  return (
    <div className="select-none p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="flex size-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} />
        </button>

        <p className="aa-display text-[15px] font-medium capitalize text-white/90">
          {MONTHS[viewMonth]} {viewYear}
        </p>

        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="flex size-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
          aria-label="Próximo mês"
        >
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {WEEKDAYS.map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="py-1 text-center text-[10px] font-medium text-white/25"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`e-${i}`} className="aspect-square" />;
          }

          const iso = toIso(viewYear, viewMonth, day);
          const selected = iso === value;
          const isToday = iso === today;
          const disabled = min ? iso < min : false;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg text-[13px] tabular-nums transition-colors",
                disabled && "cursor-not-allowed text-white/15",
                !disabled && !selected && "text-white/55 hover:bg-white/[0.06]",
                !disabled && selected && "bg-white font-medium text-zinc-950",
                !disabled && !selected && isToday && "text-white ring-1 ring-white/20",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
