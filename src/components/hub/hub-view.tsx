"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { DailyCheckinList } from "@/components/hub/daily-checkin-list";
import { StreakBadge } from "@/components/gamification/streak-badge";
import { getShareUrl } from "@/lib/leverage";
import type { DayStatus, Hub } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

type HubViewProps = {
  hub: Hub;
  onHubChange: (hub: Hub) => void;
};

export function HubView({ hub, onHubChange }: HubViewProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = getShareUrl(hub.slug);
  const finalDay = hub.days[hub.days.length - 1];

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl]);

  function handleStatusChange(dayNumber: number, status: DayStatus) {
    onHubChange({
      ...hub,
      days: hub.days.map((d) =>
        d.day === dayNumber ? { ...d, status } : d,
      ),
    });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/30">
          Salinha
        </p>
        <h1 className="aa-display text-2xl font-semibold text-white">
          {hub.name}
        </h1>
        <p className="text-sm text-white/40">
          {hub.participants} participantes, odd {hub.targetOdd.toFixed(2)}, meta{" "}
          {finalDay ? formatCurrency(finalDay.targetBank) : "..."}
        </p>
      </div>

      <div className="rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/[0.06]">
        <StreakBadge days={hub.days} />
      </div>

      <DailyCheckinList days={hub.days} onStatusChange={handleStatusChange} />

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/30">
              Link do grupo
            </p>
            <p className="mt-1 truncate text-sm text-white/55">{shareUrl}</p>
          </div>
          <button
            type="button"
            onClick={copyLink}
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center text-white/45 transition-colors hover:text-white/80"
            aria-label="Copiar link"
          >
            {copied ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" strokeWidth={1.75} />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={copyLink}
          className={cn(
            "h-12 w-full rounded-xl bg-white text-[15px] font-medium text-zinc-950 transition-all hover:bg-white/90 active:scale-[0.98]",
          )}
        >
          {copied ? "Link copiado!" : "Compartilhar link"}
        </button>
      </div>
    </div>
  );
}
