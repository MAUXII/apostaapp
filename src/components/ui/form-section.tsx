import type { InputHTMLAttributes, ReactNode } from "react";
import { Children } from "react";
import { cn } from "@/lib/utils";

export function FormSection({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div>
      {title ? (
        <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-[0.08em] text-white/28">
          {title}
        </p>
      ) : null}
      <div className="overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
        {items.map((child, i) => (
          <div key={i}>
            {child}
            {i < items.length - 1 ? (
              <div className="ml-4 h-px bg-white/[0.06]" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormRow({
  label,
  children,
  onClick,
  className,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex min-h-[48px] w-full items-center justify-between gap-4 px-4 py-2 text-left",
        onClick && "transition-colors active:bg-white/[0.04]",
        className,
      )}
    >
      <span className="shrink-0 text-[15px] text-white/85">{label}</span>
      <div className="min-w-0 flex-1 text-right">{children}</div>
    </Tag>
  );
}

export function FormInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "aa-input w-full bg-transparent text-right text-[15px] text-white outline-none placeholder:text-white/25",
        className,
      )}
      {...props}
    />
  );
}
