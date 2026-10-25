import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { startOfDay } from "date-fns";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface DateRangeFieldProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  blockedDates?: Date[];
  describedBy?: string;
}

export function DateRangeField({ value, onChange, blockedDates = [], describedBy }: DateRangeFieldProps) {
  const wide = useMediaQuery("(min-width: 48rem)");
  const today = startOfDay(new Date());

  return (
    <div className="rounded-sm border hairline bg-ivory-light p-3 sm:p-5" aria-describedby={describedBy}>
      <DayPicker
        mode="range"
        selected={value}
        onSelect={onChange}
        numberOfMonths={wide ? 2 : 1}
        startMonth={today}
        disabled={[{ before: today }, ...blockedDates]}
        excludeDisabled
        min={1}
        weekStartsOn={1}
        showOutsideDays={false}
        className="mx-auto w-fit"
      />
    </div>
  );
}
