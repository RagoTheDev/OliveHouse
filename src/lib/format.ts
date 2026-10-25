import { format, differenceInCalendarDays } from "date-fns";

export function formatDate(date: Date, pattern = "EEE d MMM yyyy"): string {
  return format(date, pattern);
}

export function toISODate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  return Math.max(0, differenceInCalendarDays(checkOut, checkIn));
}

export function pluralize(n: number, singular: string, plural = `${singular}s`): string {
  return `${n} ${n === 1 ? singular : plural}`;
}
