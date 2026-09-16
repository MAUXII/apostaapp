import Link from "next/link";
import { AppShell } from "@/components/shell/app-shell";
import { BottomCta } from "@/components/shell/bottom-cta";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col pt-2">
        <div className="space-y-4">
          <h1 className="aa-display text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white">
            Odd alvo.
            <br />
            Check-in diário.
          </h1>
          <p className="w-full text-[15px] leading-relaxed text-white/45">
            Monta a tabela sozinho, marca green ou red no dia e manda o link
            pro grupo. Sem cadastro.
          </p>
        </div>

        <BottomCta hint="grátis, sem e-mail, link instantâneo">
          <Link
            href="/criar"
            className={cn(
              "inline-flex h-12 w-full items-center justify-center rounded-xl bg-white text-[15px] font-medium text-zinc-950 transition-all hover:bg-white/90 active:scale-[0.98]",
            )}
          >
            Continuar
          </Link>
        </BottomCta>
      </div>
    </AppShell>
  );
}
