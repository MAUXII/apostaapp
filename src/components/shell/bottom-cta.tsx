import type { ReactNode } from "react";

type BottomCtaProps = {
  before?: ReactNode;
  children: ReactNode;
  hint?: ReactNode;
};

export function BottomCta({ before, children, hint }: BottomCtaProps) {
  return (
    <div className="mt-auto shrink-0 space-y-4 pb-6 pt-20">
      {before}
      {children}
      <div className="min-h-[17px] text-center text-[11px] leading-[17px] text-white/30">
        {hint ?? (
          <span aria-hidden className="invisible select-none">
            grátis, sem e-mail, link instantâneo
          </span>
        )}
      </div>
    </div>
  );
}
