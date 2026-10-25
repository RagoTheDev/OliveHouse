import { Minus, Plus } from "lucide-react";

interface GuestStepperProps {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max: number;
  id: string;
}

export function GuestStepper({ value, onChange, min = 1, max, id }: GuestStepperProps) {
  return (
    <div className="inline-flex items-center rounded-full border hairline bg-ivory-light">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Fewer guests"
        className="inline-flex size-11 items-center justify-center rounded-full text-olive transition-colors hover:bg-sand/60 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <output id={id} className="min-w-[3.5rem] text-center font-serif text-xl tabular-nums" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="More guests"
        className="inline-flex size-11 items-center justify-center rounded-full text-olive transition-colors hover:bg-sand/60 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
