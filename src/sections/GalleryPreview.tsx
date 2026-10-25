import { useState } from "react";
import { photos, photoByKey, galleryPreviewKeys } from "@/data/gallery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/animations/Reveal";
import { Lightbox } from "@/components/gallery/Lightbox";

/** Grid areas for the six curated preview images (desktop). */
const areas = [
  "md:col-span-7 md:row-span-2", // living room — hero of the grid
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-5",
];

export function GalleryPreview() {
  const [state, setState] = useState({ open: false, index: 0 });
  const open = (key: string) => setState({ open: true, index: photos.findIndex((p) => p.key === key) });

  return (
    <section className="bg-ivory py-24 md:py-36" aria-labelledby="gallery-heading">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Gallery</Eyebrow>
            </Reveal>
            <Reveal as="h2" id="gallery-heading" className="display-md mt-6" delay={0.05}>
              A visual <span className="italic font-light">tour</span>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button to="/gallery" variant="outline" arrow="right">
              View all {photos.length} photos
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-12 md:gap-5">
          {galleryPreviewKeys.map((key, i) => {
            const photo = photoByKey[key];
            const tall = i === 0;
            return (
              <Reveal as="li" key={key} delay={(i % 3) * 0.08} className={`${areas[i]} ${i === 0 ? "col-span-2" : ""}`}>
                <button
                  type="button"
                  onClick={() => open(key)}
                  className="img-zoom group block w-full text-left"
                  aria-label={`Open photo: ${photo.caption}`}
                >
                  <Picture
                    image={key}
                    sizes={tall ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 40vw, 50vw"}
                    className={`h-full ${tall ? "aspect-[4/3]! md:aspect-auto! md:h-full" : "aspect-[4/5]! md:aspect-[4/3]!"}`}
                  />
                  <span className="mt-2 block text-[0.72rem] uppercase tracking-[0.16em] text-olive-600 transition-colors group-hover:text-charcoal">
                    {photo.caption}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
      <Lightbox photos={photos} index={state.index} open={state.open} onClose={() => setState((s) => ({ ...s, open: false }))} />
    </section>
  );
}
