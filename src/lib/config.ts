/**
 * Runtime configuration read from Vite environment variables.
 * See .env.example for documentation of each value.
 */
const env = import.meta.env;

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

const whatsappDigits = clean(env.VITE_WHATSAPP_NUMBER).replace(/[^\d]/g, "");
const lat = Number.parseFloat(clean(env.VITE_MAP_LAT));
const lng = Number.parseFloat(clean(env.VITE_MAP_LNG));

export const config = {
  siteUrl: clean(env.VITE_SITE_URL).replace(/\/$/, "") || "https://olivehouse.example.com",
  airbnbUrl: clean(env.VITE_AIRBNB_URL) || "https://www.airbnb.com/rooms/1759153791039194505",
  whatsappNumber: whatsappDigits.length >= 8 ? whatsappDigits : null,
  contactEmail: clean(env.VITE_CONTACT_EMAIL) || null,
  /** Precise pin when supplied by the owner; otherwise null (general area shown). */
  mapPin: Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null,
  /** Google Maps place page for the house, when the owner has one. */
  googleMapsUrl: /^https:\/\/(www\.google\.[a-z.]+\/maps|maps\.app\.goo\.gl)\//.test(clean(env.VITE_GOOGLE_MAPS_URL))
    ? clean(env.VITE_GOOGLE_MAPS_URL)
    : null,
} as const;

export const hasWhatsApp = config.whatsappNumber !== null;
export const hasEmail = config.contactEmail !== null;
