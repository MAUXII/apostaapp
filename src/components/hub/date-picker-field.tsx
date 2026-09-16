"use client";

import { MiniCalendar } from "@/components/ui/mini-calendar";
import { FormRow } from "@/components/ui/form-section";
import { formatDateLong } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type DatePickerFieldProps = {
  value: string;
  min?: string;
  onChange: (value: string) => void;
};

export function DatePickerField({ value, min, onChange }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <FormRow label="Data final" onClick={() => setOpen(true)}>
        <span className="text-[15px] text-white/55">
          {formatDateLong(value)}
        </span>
      </FormRow>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Fechar"
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal
              className="fixed inset-x-5 bottom-8 z-50 mx-auto max-w-sm rounded-2xl bg-[#141416] ring-1 ring-white/[0.06] sm:bottom-auto sm:top-[18vh]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <MiniCalendar
                value={value}
                min={min}
                onChange={(date) => {
                  onChange(date);
                  setOpen(false);
                }}
              />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
