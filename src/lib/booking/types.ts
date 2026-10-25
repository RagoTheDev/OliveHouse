/**
 * Booking domain types. The site currently sends *inquiries* only; nothing
 * here represents a confirmed reservation. The interfaces are designed so a
 * real backend (availability calendar, iCal sync, payments) can be plugged
 * in later without touching the UI.
 */
export interface Inquiry {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  name: string;
  contact: string;
  message?: string;
}

export type AvailabilityStatus = "unknown" | "available" | "unavailable";

export interface AvailabilityProvider {
  /** Resolve availability for a date range. Must never claim availability it cannot verify. */
  check(checkIn: Date, checkOut: Date): Promise<AvailabilityStatus>;
  /** Dates to block in the calendar, when known. */
  blockedDates(): Promise<Date[]>;
}

export interface InquiryChannel {
  id: "whatsapp" | "email" | "airbnb";
  label: string;
  /** Build a URL that opens the channel with the inquiry prefilled. */
  buildUrl(inquiry: Inquiry): string;
}
