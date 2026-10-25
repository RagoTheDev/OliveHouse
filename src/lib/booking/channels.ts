import { config } from "@/lib/config";
import { property } from "@/data/property";
import { formatDate, nightsBetween, pluralize, toISODate } from "@/lib/format";
import type { Inquiry, InquiryChannel } from "./types";

function inquiryText(i: Inquiry): string {
  const nights = nightsBetween(i.checkIn, i.checkOut);
  const lines = [
    `Hello ${property.hostFirstName}, I'd like to ask about staying at ${property.name}.`,
    "",
    `Check-in: ${formatDate(i.checkIn)}`,
    `Check-out: ${formatDate(i.checkOut)} (${pluralize(nights, "night")})`,
    `Guests: ${i.guests}`,
    `Name: ${i.name}`,
    `Contact: ${i.contact}`,
  ];
  if (i.message?.trim()) lines.push("", i.message.trim());
  lines.push("", "Could you let me know if these dates are available? Thank you.");
  return lines.join("\n");
}

export const whatsappChannel: InquiryChannel | null = config.whatsappNumber
  ? {
      id: "whatsapp",
      label: "Send via WhatsApp",
      buildUrl: (i) => `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(inquiryText(i))}`,
    }
  : null;

export const emailChannel: InquiryChannel | null = config.contactEmail
  ? {
      id: "email",
      label: "Send by e-mail",
      buildUrl: (i) => {
        const subject = encodeURIComponent(`${property.name} inquiry · ${toISODate(i.checkIn)} → ${toISODate(i.checkOut)}`);
        return `mailto:${config.contactEmail}?subject=${subject}&body=${encodeURIComponent(inquiryText(i))}`;
      },
    }
  : null;

/** Airbnb listing with dates and guest count prefilled where possible. */
export const airbnbChannel: InquiryChannel = {
  id: "airbnb",
  label: "Book on Airbnb",
  buildUrl: (i) => airbnbUrl({ checkIn: i.checkIn, checkOut: i.checkOut, guests: i.guests }),
};

export function airbnbUrl(opts?: { checkIn?: Date; checkOut?: Date; guests?: number }): string {
  const url = new URL(config.airbnbUrl);
  if (opts?.checkIn) url.searchParams.set("check_in", toISODate(opts.checkIn));
  if (opts?.checkOut) url.searchParams.set("check_out", toISODate(opts.checkOut));
  if (opts?.guests) url.searchParams.set("adults", String(opts.guests));
  return url.toString();
}

export const directChannels: InquiryChannel[] = [whatsappChannel, emailChannel].filter(
  (c): c is InquiryChannel => c !== null,
);

export const hasDirectChannel = directChannels.length > 0;

/** Plain WhatsApp link without an inquiry, for footer / contact buttons. */
export function whatsappContactUrl(): string | null {
  if (!config.whatsappNumber) return null;
  const text = encodeURIComponent(`Hello, I have a question about ${property.name} in Kigamboni.`);
  return `https://wa.me/${config.whatsappNumber}?text=${text}`;
}

export { inquiryText };
