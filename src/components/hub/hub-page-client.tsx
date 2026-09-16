"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HubView } from "@/components/hub/hub-view";
import { getHub, saveHub } from "@/lib/hub-storage";
import type { Hub } from "@/lib/types";

type HubPageClientProps = {
  slug: string;
};

export function HubPageClient({ slug }: HubPageClientProps) {
  const [hub, setHub] = useState<Hub | null | undefined>(undefined);

  useEffect(() => {
    setHub(getHub(slug));
  }, [slug]);

  const handleHubChange = useCallback(
    (next: Hub) => {
      saveHub(next);
      setHub(next);
    },
    [],
  );

  if (hub === undefined) {
    return (
      <div className="py-12 text-center text-sm text-white/40">Carregando…</div>
    );
  }

  if (!hub) {
    return (
      <div className="space-y-4 py-12 text-center">
        <p className="text-sm text-white/50">
          Salinha não encontrada neste dispositivo.
        </p>
        <p className="text-xs text-white/30">
          Peça o link para quem criou ou crie uma nova.
        </p>
        <Link
          href="/criar"
          className="inline-block text-sm text-emerald-400 hover:underline"
        >
          Criar salinha
        </Link>
      </div>
    );
  }

  return <HubView hub={hub} onHubChange={handleHubChange} />;
}
