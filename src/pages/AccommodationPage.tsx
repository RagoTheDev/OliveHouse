import { Link } from "react-router-dom";
import { Seo } from "@/components/layout/Seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RelatedPages } from "@/components/layout/RelatedPages";
import { amenities, extraAmenities, goodToKnow, nearby, property } from "@/data/property";
import { bookingPath } from "@/data/navigation";
import { config } from "@/lib/config";

const practical: { label: string; value: string }[] = [
  { label: "Type", value: `${property.type}, single level, private entrance` },
  { label: "Sleeps", value: `Up to ${property.maxGuests} guests in ${property.bedrooms} bedrooms (${property.bedDetail})` },
  { label: "Bathrooms", value: `${property.bathrooms}, each with hot water and a shower` },
  { label: "Check-in", value: `${property.checkIn}, self check-in with building staff` },
  { label: "Check-out", value: property.checkOut },
  { label: "Parking", value: "Free, on the premises" },
  { label: "Pets", value: "Welcome" },
  { label: "Longer stays", value: "Stays of 28 nights or more are welcome" },
];

export default function AccommodationPage() {
  return (
    <>
      <Seo
        absoluteTitle="Accommodation in Dar es Salaam | Olive House Kigamboni"
        description="Looking for accommodation in Dar es Salaam? Olive House in Kigamboni is a two-bedroom holiday home with Wi-Fi, a kitchen and comfortable living spaces."
      />

      <section className="bg-ivory pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-28 md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="acc-heading">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow>Accommodation in Dar es Salaam · Kigamboni</Eyebrow>
              </Reveal>
              <h1 id="acc-heading" className="display-lg mt-6">
                <SplitWords text="Accommodation in Dar es Salaam, on the quiet Kigamboni side." italic={[6, 7, 8, 9]} />
              </h1>
              <Reveal as="p" className="lede mt-6 max-w-xl text-charcoal/80" delay={0.1}>
                Olive House is Dar es Salaam accommodation for people who want more than a hotel room: an entire two-bedroom home in Kigamboni with a proper kitchen, fast Wi-Fi, a desk to work at and the beach a few minutes away on foot.
              </Reveal>
            </div>
            <Reveal className="md:col-span-4 md:col-start-9" delay={0.15}>
              <ParallaxImage amount={10}>
                <Picture image="olive-house-kigamboni-kitchen" sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[4/5]!" />
              </ParallaxImage>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-ivory-light py-20 md:py-28" aria-labelledby="facilities-heading">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <Eyebrow>Facilities</Eyebrow>
              </Reveal>
              <Reveal as="h2" id="facilities-heading" className="display-md mt-6" delay={0.05}>
                What the house <span className="italic font-light">provides.</span>
              </Reveal>
              <Reveal as="p" className="mt-6 max-w-sm text-[1.02rem] leading-[1.75] text-charcoal/80" delay={0.1}>
                Every facility listed here is verified on the official listing, so you can plan your stay with confidence.
              </Reveal>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal as="dl" stagger={0.06} className="divide-y hairline border-y hairline">
              {practical.map((row) => (
                <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="eyebrow text-olive-600">{row.label}</dt>
                  <dd className="text-[1rem] leading-relaxed text-charcoal/85">{row.value}</dd>
                </div>
              ))}
            </Reveal>

            <Reveal as="ul" stagger={0.06} className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {amenities.map(({ id, label, description, icon: Icon }) => (
                <li key={id} className="flex gap-4">
                  <Icon className="mt-1 size-5 shrink-0 text-olive" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <h3 className="font-serif text-xl leading-tight">{label}</h3>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-charcoal/75">{description}</p>
                  </div>
                </li>
              ))}
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {extraAmenities.map((group, i) => (
                <Reveal key={group.group} delay={i * 0.06}>
                  <p className="eyebrow text-olive-600">{group.group}</p>
                  <ul className="mt-3 flex flex-col gap-1.5 text-[0.92rem] leading-snug text-charcoal/80">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 border-l-2 border-terracotta bg-sand/40 px-6 py-5">
              <p className="eyebrow text-terracotta-deep">Good to know</p>
              <ul className="mt-2 flex flex-col gap-1 font-serif text-lg leading-snug text-charcoal/85">
                {goodToKnow.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location and getting here */}
      <section className="bg-olive-900 py-20 text-ivory md:py-28" aria-labelledby="getting-here-heading">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow light>Location</Eyebrow>
            </Reveal>
            <Reveal as="h2" id="getting-here-heading" className="display-md mt-6 text-ivory" delay={0.05}>
              Dar es Salaam, from the quiet side of the harbour.
            </Reveal>
            <Reveal stagger={0.08} className="mt-6 flex max-w-md flex-col gap-4 text-[1.02rem] leading-[1.75] text-sand/85">
              <p>
                Kigamboni is the peninsula directly across the water from central Dar es Salaam. The house sits on Mikadi Street, a short walk from the shore, with shops and cafés in the neighbourhood.
              </p>
              <p>
                From the airport or the city centre you can drive over Julius Nyerere Bridge, or take the Kigamboni ferry from the Kivukoni waterfront and continue by car or tuk-tuk. Both routes end with free parking at the house.
              </p>
              <p>
                <Link to="/#location" className="link-underline text-ivory">
                  See the map on the home page
                </Link>
                {config.googleMapsUrl && (
                  <>
                    {" "}or{" "}
                    <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-ivory">
                      open Olive House in Google Maps
                    </a>
                  </>
                )}
                .
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal as="dl" stagger={0.1} className="divide-y hairline-light border-y hairline-light">
              {nearby.map((place) => (
                <div key={place.name} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-5 sm:grid-cols-[8rem_1fr]">
                  <dd className="font-serif text-[2.4rem] leading-none tabular-nums sm:text-[3rem]">
                    {place.value}
                    <span className="ml-1 text-[0.4em] uppercase tracking-[0.12em] text-sand/85">{place.unit}</span>
                  </dd>
                  <dt>
                    <span className="block font-serif text-xl leading-tight">{place.name}</span>
                    <span className="block text-[0.72rem] uppercase tracking-[0.16em] text-sand/85">{place.mode}</span>
                  </dt>
                </div>
              ))}
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-4" delay={0.2}>
              <Button to={bookingPath} variant="ivory" arrow="right">
                Check dates &amp; enquire
              </Button>
              <Button to="/holiday-home-kigamboni" variant="outline-light" arrow="right">
                The holiday home experience
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <RelatedPages />
    </>
  );
}
