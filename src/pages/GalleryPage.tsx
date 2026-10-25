import { useMemo, useState } from "react";
import { Seo } from "@/components/layout/Seo";
import { photos } from "@/data/gallery";
import { rooms } from "@/data/property";
import type { RoomId } from "@/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { Lightbox } from "@/components/gallery/Lightbox";
import { bookingPath } from "@/data/navigation";

type Filter = "all" | RoomId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Outside" },
  ...rooms.map((r) => {
    const label = r.name.replace(/^The /, "");
    return { id: r.id, label: label.charAt(0).toUpperCase() + label.slice(1) };
  }),
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [state, setState] = useState({ open: false, index: 0 });
  const visible = useMemo(() => (filter === "all" ? photos : photos.filter((p) => p.room === filter)), [filter]);

  return (
    <>
      <Seo title="Gallery" description="Every room of Olive House in Kigamboni, photographed as it is: living room, two bedrooms, kitchen, bathrooms and the veranda." />
      <section className="bg-ivory pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-36 md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="gallery-page-heading">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <Eyebrow>Gallery</Eyebrow>
              </Reveal>
              <Reveal as="h1" id="gallery-page-heading" className="display-lg mt-6" delay={0.05}>
                The house, <span className="italic font-light">as it is.</span>
              </Reveal>
              <Reveal as="p" className="lede mt-5 max-w-xl text-charcoal/80" delay={0.1}>
                {photos.length} photographs of Olive House. Nothing staged, nothing borrowed — tap any image to view it full screen.
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Button to={bookingPath} arrow="right">
                Book Your Stay
              </Button>
            </Reveal>
          </div>

          <Reveal className="mt-10 flex flex-wrap gap-2" delay={0.2}>
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`h-10 rounded-full border px-4 text-[0.75rem] uppercase tracking-[0.16em] transition-colors ${
                  filter === f.id ? "border-olive bg-olive text-ivory" : "border-charcoal/20 text-charcoal hover:border-charcoal"
                }`}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-5 [&>li]:mb-3 md:[&>li]:mb-5" aria-live="polite">
            {visible.map((photo) => (
              <li key={photo.key} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setState({ open: true, index: photos.findIndex((p) => p.key === photo.key) })}
                  className="img-zoom group block w-full text-left"
                  aria-label={`Open photo: ${photo.caption}`}
                >
                  <Picture image={photo.key} sizes="(min-width: 768px) 33vw, 50vw" />
                  <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.16em] text-olive-600 group-hover:text-charcoal">{photo.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Lightbox photos={photos} index={state.index} open={state.open} onClose={() => setState((s) => ({ ...s, open: false }))} />
    </>
  );
}
