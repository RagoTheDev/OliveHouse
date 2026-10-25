import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { nearby, approximateArea } from "@/data/property";
import { config } from "@/lib/config";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";

const LeafletMap = lazy(() => import("@/components/location/LeafletMap"));

const mapsUrl =
  config.googleMapsUrl ??
  (config.mapPin
    ? `https://www.google.com/maps/search/?api=1&query=${config.mapPin.lat},${config.mapPin.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(approximateArea.label)}`);

export function Location() {
  const mapWrap = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  // Only load Leaflet (and OSM tiles) when the map is near the viewport.
  useEffect(() => {
    const el = mapWrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="location" className="bg-olive-900 py-24 text-ivory md:py-36" aria-labelledby="location-heading">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow light>Location</Eyebrow>
            </Reveal>
            <h2 id="location-heading" className="display-md mt-6 text-ivory">
              <SplitWords text="Close to the coast. Connected to the city." italic={[3, 7]} />
            </h2>
            <Reveal as="p" className="mt-6 max-w-md text-[1.02rem] leading-[1.75] text-sand/85" delay={0.1}>
              Kigamboni sits across the harbour from central Dar es Salaam: quiet streets, the Indian Ocean a short walk away, and the ferry or the bridge when you want the city.
            </Reveal>

            <Reveal as="dl" stagger={0.1} className="mt-12 divide-y hairline-light border-y hairline-light">
              {nearby.map((place) => (
                <div key={place.name} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-5 sm:grid-cols-[8rem_1fr]">
                  <dd className="font-serif text-[2.6rem] leading-none tabular-nums sm:text-[3.2rem]">
                    {place.value}
                    <span className="ml-1 text-[0.4em] uppercase tracking-[0.12em] text-sand/80">{place.unit}</span>
                  </dd>
                  <dt>
                    <span className="block font-serif text-xl leading-tight">{place.name}</span>
                    <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-sand/85">{place.mode}</span>
                  </dt>
                </div>
              ))}
            </Reveal>
            <p className="mt-4 text-[0.78rem] text-sand/80">Travel times are approximate and depend on traffic and the tide of the day.</p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal y={40}>
              <div
                ref={mapWrap}
                className="relative aspect-[4/3] w-full overflow-hidden bg-olive-800 md:aspect-[4/4.6] lg:aspect-[4/3.6]"
                data-lenis-prevent
              >
                {mount ? (
                  <Suspense fallback={<MapFallback />}>
                    <LeafletMap />
                  </Suspense>
                ) : (
                  <MapFallback />
                )}
                <div className="pointer-events-none absolute left-4 top-4 z-[500] rounded-full bg-ivory/90 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-olive-900 backdrop-blur">
                  {config.mapPin ? "Olive House" : "Approximate area · Kigamboni"}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.8rem] text-sand/90">
                <p>{config.mapPin ? "Pinned to the house. Open the map for directions." : "The precise address is shared with confirmed guests."}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 uppercase tracking-[0.14em] text-ivory"
                >
                  Open in Google Maps <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(168,177,154,0.25),transparent_60%)]" aria-hidden="true">
      <span className="eyebrow text-sand/60">Loading map…</span>
    </div>
  );
}
