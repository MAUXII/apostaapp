import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ label, hint, children, className }: FieldProps) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/35">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="block text-[11px] text-white/30">{hint}</span>
      ) : null}
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 focus:border-emerald-500/40 focus:bg-white/[0.06]",
        className,
      )}
      {...props}
    />
  );
}
