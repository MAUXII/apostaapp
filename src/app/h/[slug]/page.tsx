import Link from "next/link";
import { HubPageClient } from "@/components/hub/hub-page-client";
import { AppShell } from "@/components/shell/app-shell";

type HubPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function HubPage({ params }: HubPageProps) {
  const { slug } = await params;

  return (
    <AppShell
      header={
        <Link
          href="/criar"
          className="text-sm text-white/45 transition-colors hover:text-white/70"
        >
          ← Nova salinha
        </Link>
      }
    >
      <HubPageClient slug={slug} />
    </AppShell>
  );
}
