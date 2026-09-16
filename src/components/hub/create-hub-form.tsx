"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DatePickerField } from "@/components/hub/date-picker-field";
import { BottomCta } from "@/components/shell/bottom-cta";
import {
  FormInput,
  FormRow,
  FormSection,
} from "@/components/ui/form-section";
import { createHub } from "@/lib/leverage";
import { saveHub } from "@/lib/hub-storage";
import { cn, formatCurrency } from "@/lib/utils";

function defaultEndDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
}

export function CreateHubForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [initialBank, setInitialBank] = useState("100");
  const [targetOdd, setTargetOdd] = useState("1.30");
  const [participants, setParticipants] = useState("2");
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [submitting, setSubmitting] = useState(false);

  const preview = useMemo(() => {
    const bank = parseFloat(initialBank) || 0;
    const odd = parseFloat(targetOdd) || 1;
    const end = new Date(endDate);
    const start = new Date();
    const parts = parseInt(participants) || 1;
    const days = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );
    const finalBank = bank * Math.pow(odd, days);
    return { days, finalBank, perHead: finalBank / parts };
  }, [initialBank, targetOdd, endDate, participants]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const hub = createHub({
      name,
      initialBank: parseFloat(initialBank) || 100,
      targetOdd: parseFloat(targetOdd) || 1.3,
      participants: parseInt(participants) || 2,
      endDate,
    });

    saveHub(hub);
    router.push(`/h/${hub.slug}`);
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <FormSection>
        <FormRow label="Grupo">
          <FormInput
            placeholder="Opcional"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormRow>
        <FormRow label="Banca">
          <FormInput
            type="number"
            inputMode="decimal"
            min="1"
            step="0.01"
            value={initialBank}
            onChange={(e) => setInitialBank(e.target.value)}
            required
          />
        </FormRow>
        <FormRow label="Odd">
          <FormInput
            type="number"
            inputMode="decimal"
            min="1.01"
            step="0.01"
            value={targetOdd}
            onChange={(e) => setTargetOdd(e.target.value)}
            required
          />
        </FormRow>
        <FormRow label="Participantes">
          <FormInput
            type="number"
            inputMode="numeric"
            min="1"
            max="20"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            required
          />
        </FormRow>
        <DatePickerField value={endDate} min={today} onChange={setEndDate} />
      </FormSection>

      <BottomCta
        before={
          <div className="px-1">
            <p className="font-mono text-lg font-medium tabular-nums text-white/90">
              {formatCurrency(preview.finalBank)}
            </p>
            <p className="mt-0.5 text-[11px] text-white/30">
              {preview.days} dias, {formatCurrency(preview.perHead)}/pessoa
            </p>
          </div>
        }
      >
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "h-12 w-full rounded-xl bg-white text-[15px] font-medium text-zinc-950 transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-40",
          )}
        >
          {submitting ? "Criando…" : "Criar salinha"}
        </button>
      </BottomCta>
    </form>
  );
}
