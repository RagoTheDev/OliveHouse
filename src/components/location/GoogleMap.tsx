import { config } from "@/lib/config";
import { approximateArea, property } from "@/data/property";

/**
 * Keyless Google Maps embed.
 *
 * Preference order:
 * 1. The owner's Google place (parsed from VITE_GOOGLE_MAPS_URL) — shows the
 *    "Olive House" card with Open in Maps / directions.
 * 2. A pin at VITE_MAP_LAT / VITE_MAP_LNG.
 * 3. The general Kigamboni area.
 */
function placeFromUrl(url: string | null): { ftid: string; name: string } | null {
  if (!url) return null;
  const ftid = url.match(/!1s(0x[0-9a-f]+:0x[0-9a-f]+)/i)?.[1];
  const name = url.match(/\/maps\/place\/([^/@?]+)/)?.[1];
  if (!ftid) return null;
  return { ftid, name: name ? decodeURIComponent(name.replace(/\+/g, " ")) : property.name };
}

function embedSrc(): string {
  const pin = config.mapPin;
  const place = placeFromUrl(config.googleMapsUrl);
  if (place && pin) {
    const pb =
      `!1m18!1m12!1m3!1d700!2d${pin.lng}!3d${pin.lat}` +
      `!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1` +
      `!3m3!1m2!1s${encodeURIComponent(place.ftid)}!2s${encodeURIComponent(place.name)}` +
      `!5e0!3m2!1sen!2s${property.countryCode.toLowerCase()}!4v1`;
    return `https://www.google.com/maps/embed?pb=${pb}`;
  }
  const query = pin ? `${pin.lat},${pin.lng}` : approximateArea.label;
  const zoom = pin ? 17 : approximateArea.zoom;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;
}

export function GoogleMap({ className = "" }: { className?: string }) {
  return (
    <iframe
      src={embedSrc()}
      title={`Map of ${property.name} in ${property.locality}, ${property.city}`}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className={`block h-full w-full border-0 ${className}`}
    />
  );
}
