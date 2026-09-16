import Link from "next/link";
import { CreateHubForm } from "@/components/hub/create-hub-form";
import { AppShell } from "@/components/shell/app-shell";

export default function CriarPage() {
  return (
    <AppShell
      header={
        <Link
          href="/"
          className="text-sm text-white/45 transition-colors hover:text-white/70"
        >
          ← Voltar
        </Link>
      }
    >
      <CreateHubForm />
    </AppShell>
  );
}
