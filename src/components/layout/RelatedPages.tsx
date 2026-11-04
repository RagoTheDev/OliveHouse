import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stayPages } from "@/data/navigation";
import { Reveal } from "@/components/animations/Reveal";

const blurbs: Record<string, string> = {
  "/accommodation-kigamboni": "Facilities, amenities and how to get here.",
  "/holiday-home-kigamboni": "What a stay in the two-bedroom house is like.",
  "/gallery": "Every room, photographed as it is.",
  "/contact": "WhatsApp, e-mail, Airbnb, address and check-in.",
  "/book": "Choose dates and send a booking enquiry.",
};

/** Cross-links between the informational pages, excluding the current one. */
export function RelatedPages() {
  const { pathname } = useLocation();
  const links = stayPages.filter((p) => p.to !== pathname);
  return (
    <section className="border-t hairline bg-ivory-light py-16 md:py-24" aria-labelledby="related-heading">
      <div className="container-x">
        <Reveal>
          <h2 id="related-heading" className="eyebrow text-olive-600">
            Continue exploring
          </h2>
        </Reveal>
        <Reveal as="ul" stagger={0.08} className="mt-6 grid gap-px overflow-hidden rounded-sm border hairline bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((p) => (
            <li key={p.to} className="bg-ivory-light">
              <Link to={p.to} className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-sand/40 md:p-8">
                <span>
                  <span className="block font-serif text-2xl leading-tight">{p.label}</span>
                  <span className="mt-2 block text-[0.92rem] text-charcoal/70">{blurbs[p.to]}</span>
                </span>
                <ArrowRight className="size-5 text-olive transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
