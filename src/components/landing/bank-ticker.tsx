import type { LeverageDay } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type BankTickerProps = {
  days: LeverageDay[];
};

export function BankTicker({ days }: BankTickerProps) {
  const greens = days.filter((d) => d.status === "green");

  if (greens.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
      {greens.map((day, i) => (
        <div key={day.day} className="flex items-center gap-1.5">
          {i > 0 ? (
            <span className="text-[10px] text-white/20">→</span>
          ) : null}
          <span className="whitespace-nowrap font-mono text-[11px] tabular-nums text-white/40">
            {formatCurrency(day.targetBank)}
          </span>
        </div>
      ))}
    </div>
  );
}
