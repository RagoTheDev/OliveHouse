import { Seo } from "@/components/layout/Seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { Picture } from "@/components/ui/Picture";
import { BookingForm } from "@/components/booking/BookingForm";
import { property } from "@/data/property";
import { config } from "@/lib/config";

export default function BookPage() {
  return (
    <>
      <Seo title="Book Your Stay" description="Check dates and send a booking inquiry for Olive House, Kigamboni — or book directly on Airbnb." />
      <section className="bg-ivory pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-36 md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="book-heading">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow>Book Your Stay</Eyebrow>
              </Reveal>
              <Reveal as="h1" id="book-heading" className="display-lg mt-6" delay={0.05}>
                Tell us <span className="italic font-light">when.</span>
              </Reveal>
              <Reveal as="p" className="lede mt-5 max-w-xl text-charcoal/80" delay={0.1}>
                Choose your dates and we will draft an inquiry to the host. Prefer Airbnb? The same dates carry across to the official listing.
              </Reveal>
            </div>
            <Reveal className="md:col-span-4 md:col-start-9" delay={0.15}>
              <Picture image="hero-exterior" sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[4/3]!" position="42% 60%" />
              <p className="mt-3 text-[0.78rem] text-charcoal/65">
                {property.type} · {property.bedrooms} bedrooms · up to {property.maxGuests} guests · check-in {property.checkIn}
              </p>
            </Reveal>
          </div>

          <div className="mt-16 md:mt-24">
            <BookingForm />
          </div>

          <p className="mt-12 text-[0.85rem] text-charcoal/65">
            Looking for the listing itself?{" "}
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">
              Olive House on Airbnb
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
