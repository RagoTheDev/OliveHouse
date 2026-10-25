import { config } from "@/lib/config";
import { approximateArea, property } from "@/data/property";

/**
 * Keyless Google Maps embed centred on the house (or the general Kigamboni
 * area when no pin is configured). Loaded lazily by the browser.
 */
export function GoogleMap({ className = "" }: { className?: string }) {
  const pin = config.mapPin;
  const query = pin ? `${pin.lat},${pin.lng}` : approximateArea.label;
  const zoom = pin ? 17 : approximateArea.zoom;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;

  return (
    <iframe
      src={src}
      title={`Map of ${property.name} in ${property.locality}, ${property.city}`}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className={`block h-full w-full border-0 ${className}`}
    />
  );
}
