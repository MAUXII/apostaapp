import type { LeverageDay } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

const statusIcon = {
  pending: "○",
  green: "✓",
  red: "✗",
} as const;

const statusColor = {
  pending: "text-white/30",
  green: "text-emerald-400",
  red: "text-red-400",
} as const;

type LeveragePreviewTableProps = {
  days: LeverageDay[];
  compact?: boolean;
};

export function LeveragePreviewTable({
  days,
  compact = false,
}: LeveragePreviewTableProps) {
  const visible = compact ? days.slice(0, 5) : days;

  return (
    <GlassCard padding="none" className="overflow-hidden">
      <div className="border-b border-white/10 px-4 py-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/30">
          Tabela de alavancagem
        </p>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {visible.map((day) => (
          <div
            key={day.day}
            className="flex items-center justify-between gap-3 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex size-6 items-center justify-center text-xs ${statusColor[day.status]}`}
              >
                {statusIcon[day.status]}
              </span>
              <div>
                <p className="text-sm text-white/90">
                  Dia {day.day}
                  <span className="ml-2 text-xs text-white/35">
                    {formatDate(new Date(day.date))}
                  </span>
                </p>
              </div>
            </div>
            <p className="text-sm tabular-nums text-white/60">
              {formatCurrency(day.targetBank)}
            </p>
          </div>
        ))}
      </div>

      {compact && days.length > 5 ? (
        <div className="border-t border-white/10 px-4 py-2 text-center text-xs text-white/30">
          +{days.length - 5} dias
        </div>
      ) : null}
    </GlassCard>
  );
}
