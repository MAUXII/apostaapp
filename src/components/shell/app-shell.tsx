import type { ReactNode } from "react";
import { ShellAtmosphere } from "./atmosphere";

type AppShellProps = {
  children: ReactNode;
  header?: ReactNode;
};

export function AppShell({ children, header }: AppShellProps) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-[var(--aa-bg)] text-[var(--aa-ink)]">
      <ShellAtmosphere />

      <div className="aa-shell relative z-10 mx-auto flex min-h-0 w-full flex-1 flex-col px-[var(--aa-content-pad-x)] pb-10 pt-8">
        {header ? <header className="mb-6 shrink-0">{header}</header> : null}
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
