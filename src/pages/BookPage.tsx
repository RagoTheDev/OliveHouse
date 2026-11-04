import { Link } from "react-router-dom";
import { Seo } from "@/components/layout/Seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";
import { Picture } from "@/components/ui/Picture";
import { BookingForm } from "@/components/booking/BookingForm";
import { RelatedPages } from "@/components/layout/RelatedPages";
import { property } from "@/data/property";
import { config } from "@/lib/config";
import { hasDirectChannel } from "@/lib/booking/channels";

const steps: { title: string; body: string }[] = [
  { title: "Pick your dates", body: "Choose check-in and check-out below. Past dates are blocked; the calendar does not yet show live availability." },
  {
    title: "Send the enquiry",
    body: hasDirectChannel
      ? "We draft a message with your dates and guests for WhatsApp or e-mail. The host confirms availability by reply."
      : "Your dates carry across to the Airbnb listing, where availability and payment are handled.",
  },
  { title: "Or book on Airbnb", body: "Prefer instant confirmation and Airbnb's payment protection? Continue on the official listing with the same dates." },
];

export default function BookPage() {
  return (
    <>
      <Seo
        absoluteTitle="Book a Holiday Home in Dar es Salaam | Olive House Kigamboni"
        description="Book a holiday home in Dar es Salaam: check dates and send a booking enquiry for Olive House in Kigamboni, or book directly on Airbnb."
      />
      <section className="bg-ivory pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-28 md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="book-heading">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow>Book your stay</Eyebrow>
              </Reveal>
              <h1 id="book-heading" className="display-lg mt-6">
                <SplitWords text="Book a holiday home in Dar es Salaam." italic={[1, 2]} />
              </h1>
              <Reveal as="p" className="lede mt-5 max-w-xl text-charcoal/80" delay={0.1}>
                Olive House sleeps up to {property.maxGuests} guests in {property.bedrooms} bedrooms in Kigamboni, five minutes from the beach. Choose your dates and send a booking enquiry, or book on Airbnb.
              </Reveal>
            </div>
            <Reveal className="md:col-span-4 md:col-start-9" delay={0.15}>
              <Picture image="olive-house-kigamboni-bedroom-one" sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[4/3]!" position="center 40%" />
              <p className="mt-3 text-[0.78rem] text-charcoal/65">
                {property.type} · {property.bedrooms} bedrooms · up to {property.maxGuests} guests · check-in {property.checkIn}
              </p>
            </Reveal>
          </div>

          <Reveal as="ol" stagger={0.08} className="mt-14 grid gap-px overflow-hidden rounded-sm border hairline bg-charcoal/10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-ivory-light p-6 md:p-8">
                <p className="eyebrow text-terracotta-deep">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-serif text-2xl leading-tight">{s.title}</h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/75">{s.body}</p>
              </li>
            ))}
          </Reveal>

          <div className="mt-16 md:mt-24">
            <BookingForm />
          </div>

          <p className="mt-12 text-[0.85rem] text-charcoal/65">
            Questions before you book?{" "}
            <Link to="/contact" className="link-underline text-charcoal">
              Contact Olive House
            </Link>{" "}
            or see the{" "}
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">
              listing on Airbnb
            </a>
            .
          </p>
        </div>
      </section>
      <RelatedPages />
    </>
  );
}
