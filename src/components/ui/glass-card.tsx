import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md";
};

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-5",
};

export function GlassCard({
  children,
  className,
  padding = "md",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]",
        paddingMap[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
