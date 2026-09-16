import type { ReactNode } from "react";
import { ShellAtmosphere } from "./atmosphere";

type AppShellProps = {
  children: ReactNode;
  header?: ReactNode;
};

export function AppShell({ children, header }: AppShellProps) {
  return (
    <div className="relative min-h-dvh bg-[var(--aa-bg)] text-[var(--aa-ink)]">
      <ShellAtmosphere />

      <div className="aa-shell relative z-10 mx-auto flex min-h-dvh w-full flex-col px-[var(--aa-content-pad-x)] pb-10 pt-8">
        {header ? <header className="mb-6">{header}</header> : null}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
