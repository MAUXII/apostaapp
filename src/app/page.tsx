import Link from "next/link";
import { AppShell } from "@/components/shell/app-shell";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex min-h-[calc(100dvh-5rem)] flex-col pt-2">
        <div className="space-y-4">
          <h1 className="aa-display text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white">
            Odd alvo.
            <br />
            Check-in diário.
          </h1>
          <p className="max-w-[17rem] text-[15px] leading-[1.55] text-white/45">
            Tabela de alavancagem automática, marcação green/red e streak pro
            grupo. Link compartilhável, sem cadastro.
          </p>
        </div>

        <div className="mt-auto space-y-4 pb-6 pt-20">
          <Link
            href="/criar"
            className={cn(
              "inline-flex h-12 w-full items-center justify-center rounded-xl bg-white text-[15px] font-medium text-zinc-950 transition-all hover:bg-white/90 active:scale-[0.98]",
            )}
          >
            Criar salinha
          </Link>
          <p className="text-center text-[11px] text-white/30">
            grátis, sem e-mail, link instantâneo
          </p>
        </div>
      </div>
    </AppShell>
  );
}
