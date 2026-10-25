import { useState } from "react";
import { rooms } from "@/data/property";
import { photos, photoByKey } from "@/data/gallery";
import type { ImageKey } from "@/data/images.generated";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RoomCarousel } from "@/components/gallery/RoomCarousel";
import { Lightbox } from "@/components/gallery/Lightbox";

const byId = Object.fromEntries(rooms.map((r) => [r.id, r]));
const living = byId["living-room"];
const bedOne = byId["bedroom-one"];
const bedTwo = byId["bedroom-two"];
const kitchen = byId["kitchen"];
const bath = byId["bathroom"];
const carouselImages: ImageKey[] = [...kitchen.photos, ...bath.photos];

function RoomMeta({ index, name, tagline, facts }: { index: string; name: string; tagline: string; facts: string[] }) {
  return (
    <div>
      <p className="eyebrow text-sand/85">
        {index} <span className="mx-2 opacity-40">—</span> {name}
      </p>
      <h3 className="display-sm mt-3 text-ivory">{tagline}</h3>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.78rem] uppercase tracking-[0.14em] text-sand/90">
        {facts.map((f) => (
          <li key={f} className="flex items-center gap-2 before:size-1 before:rounded-full before:bg-terracotta">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TheHouse() {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const openKey = (key: ImageKey) => setLightbox({ open: true, index: photos.findIndex((p) => p.key === key) });

  return (
    <section id="house" className="relative bg-olive-950 py-24 text-ivory md:py-36" aria-labelledby="house-heading">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow light>The House</Eyebrow>
            </Reveal>
            <h2 id="house-heading" className="display-lg mt-6 text-ivory">
              <SplitWords text="Two bedrooms, two bathrooms, and room to breathe." italic={[6, 7, 8]} />
            </h2>
          </div>
          <Reveal as="p" className="lede text-sand/85 md:col-span-4 md:self-end">
            Entire home for up to three guests. Every room is photographed as it is — nothing staged, nothing invented.
          </Reveal>
        </div>

        {/* 01 — Living room: dominant image */}
        <article className="mt-20 md:mt-28" aria-label={living.name}>
          <ParallaxImage className="w-full" amount={10}>
            <button type="button" onClick={() => openKey("living-room")} className="img-zoom block w-full" aria-label="Open photo: the living room">
              <Picture image="living-room" sizes="100vw" className="aspect-[4/3] md:aspect-[21/9]" position="center 60%" style={{ aspectRatio: "auto" }} />
            </button>
          </ParallaxImage>
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <RoomMeta index={living.index} name={living.name} tagline={living.tagline} facts={living.facts} />
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-[1.02rem] leading-[1.75] text-ivory/80 md:col-span-5 md:col-start-8">
              {living.description}
            </Reveal>
          </div>
        </article>

        {/* 02 + 03 — Bedrooms: split screen */}
        <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-2 md:gap-10 lg:gap-16">
          {[bedOne, bedTwo].map((room, i) => (
            <article key={room.id} className={i === 1 ? "md:pt-24" : ""} aria-label={room.name}>
              <ParallaxImage amount={12} scale={1.12}>
                <button
                  type="button"
                  onClick={() => openKey(room.photos[0])}
                  className="img-zoom block w-full"
                  aria-label={`Open photo: ${photoByKey[room.photos[0]].caption}`}
                >
                  <Picture image={room.photos[0]} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5]!" position={i === 1 ? "60% center" : "center"} />
                </button>
              </ParallaxImage>
              <div className="mt-8 grid gap-6 sm:grid-cols-5">
                <Reveal className="sm:col-span-3">
                  <RoomMeta index={room.index} name={room.name} tagline={room.tagline} facts={room.facts} />
                </Reveal>
                <Reveal className="sm:col-span-2" delay={0.1}>
                  <button
                    type="button"
                    onClick={() => openKey(room.photos[1])}
                    className="img-zoom block w-3/5 sm:ml-auto sm:w-4/5"
                    aria-label={`Open photo: ${photoByKey[room.photos[1]].caption}`}
                  >
                    <Picture image={room.photos[1]} sizes="(min-width: 640px) 20vw, 60vw" className="aspect-square!" />
                  </button>
                </Reveal>
              </div>
              <Reveal as="p" className="mt-6 max-w-prose text-[1.02rem] leading-[1.75] text-ivory/80">
                {room.description}
              </Reveal>
            </article>
          ))}
        </div>

        {/* 04 + 05 — Kitchen and bathrooms: horizontal gallery */}
        <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
          <div className="min-w-0 md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <RoomMeta index={`${kitchen.index}–${bath.index}`} name="Kitchen & bathrooms" tagline="Cook as if you lived here." facts={[...kitchen.facts.slice(0, 2), ...bath.facts.slice(0, 1)]} />
              </Reveal>
              <Reveal as="p" delay={0.1} className="mt-6 text-[1.02rem] leading-[1.75] text-ivory/80">
                {kitchen.description}
              </Reveal>
              <Reveal as="p" delay={0.15} className="mt-4 text-[1.02rem] leading-[1.75] text-ivory/80">
                {bath.description}
              </Reveal>
            </div>
          </div>
          <Reveal className="min-w-0 md:col-span-8" y={40}>
            <RoomCarousel images={carouselImages} onOpen={openKey} label="Kitchen and bathroom photos" />
          </Reveal>
        </div>
      </div>

      <Lightbox photos={photos} index={lightbox.index} open={lightbox.open} onClose={() => setLightbox((s) => ({ ...s, open: false }))} />
    </section>
  );
}
