import { Seo } from "@/components/layout/Seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { RelatedPages } from "@/components/layout/RelatedPages";
import { rooms, property } from "@/data/property";
import { bookingPath } from "@/data/navigation";
import { config } from "@/lib/config";
import type { ImageKey } from "@/data/images.generated";

const byId = Object.fromEntries(rooms.map((r) => [r.id, r]));

const whoFor: { title: string; body: string }[] = [
  {
    title: "Couples and friends",
    body: "Two separate bedrooms with their own bathrooms, so a pair of friends or a couple with a guest each get privacy.",
  },
  {
    title: "Remote workers",
    body: "A dedicated workspace, dependable Wi-Fi and a quiet street. Stay a week, or 28 nights and more.",
  },
  {
    title: "Beach-first travellers",
    body: "The shoreline is about five minutes on foot. Mornings at the water, afternoons under the ceiling fan.",
  },
  {
    title: "Travelling with a pet",
    body: "Pets are welcome, with a private entrance and a veranda to come home to.",
  },
];

const rhythm: { time: string; text: string; image: ImageKey }[] = [
  { time: "Arrive", text: `Check in between ${property.checkIn.replace(" – ", " and ")} with the building staff, park for free and let yourself in through the red gate.`, image: "olive-house-kigamboni-exterior" },
  { time: "Settle", text: "Unpack into the timber wardrobes, put the kettle on, and open the curtains in whichever bedroom you choose first.", image: "olive-house-kigamboni-bedroom-two" },
  { time: "Live", text: "Cook in the kitchen, work at the desk, walk to the beach, and spend the evenings on the sofa with the fan turning.", image: "olive-house-kigamboni-living-room" },
];

export default function HolidayHomePage() {
  return (
    <>
      <Seo
        absoluteTitle="Holiday Home in Dar es Salaam | Olive House"
        description="Stay at Olive House, a two-bedroom holiday home in Dar es Salaam's Kigamboni neighbourhood, with beach access nearby, Wi-Fi and a fully equipped kitchen."
      />

      <section className="relative isolate overflow-hidden bg-olive-950 text-ivory" aria-labelledby="hh-heading">
        <ParallaxImage className="absolute inset-0 h-full w-full" amount={12} scale={1.14} reveal={false}>
          <Picture image="olive-house-kigamboni-living-room" sizes="100vw" position="center 60%" className="h-full w-full" imgClassName="min-h-full" style={{ aspectRatio: "auto" }} />
        </ParallaxImage>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,36,25,0.92)_0%,rgba(31,36,25,0.55)_55%,rgba(31,36,25,0.35)_100%)]" />
        <div className="container-x relative flex min-h-[70svh] flex-col justify-end pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
          <Reveal>
            <Eyebrow light>Holiday home in Dar es Salaam</Eyebrow>
          </Reveal>
          <h1 id="hh-heading" className="display-lg mt-6 max-w-[16ch] text-ivory">
            <SplitWords text="A two-bedroom holiday home in Dar es Salaam, five minutes from the sea." italic={[1]} />
          </h1>
          <Reveal as="p" className="lede mt-6 max-w-xl text-ivory/85" delay={0.15}>
            A holiday rental in Kigamboni, Dar es Salaam, that feels like a home you have borrowed from a friend: your own front door, two bedrooms, two bathrooms, a kitchen you will actually use, and the beach a short walk away.
          </Reveal>
        </div>
      </section>

      {/* Who it suits */}
      <section className="bg-ivory py-20 md:py-28" aria-labelledby="whofor-heading">
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Who it suits</Eyebrow>
            </Reveal>
            <Reveal as="h2" id="whofor-heading" className="display-md mt-6" delay={0.05}>
              Made for small groups and <span className="italic font-light">long, easy days.</span>
            </Reveal>
          </div>
          <Reveal as="ul" stagger={0.08} className="mt-12 grid gap-px border hairline bg-charcoal/10 sm:grid-cols-2">
            {whoFor.map((w) => (
              <li key={w.title} className="bg-ivory p-6 md:p-8">
                <h3 className="font-serif text-2xl leading-tight">{w.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-[1.7] text-charcoal/80">{w.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* The rooms, briefly */}
      <section className="bg-olive-950 py-20 text-ivory md:py-28" aria-labelledby="rooms-heading">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow light>The two bedrooms</Eyebrow>
              </Reveal>
              <Reveal as="h2" id="rooms-heading" className="display-md mt-6 text-ivory" delay={0.05}>
                A two-bedroom holiday rental in Kigamboni.
              </Reveal>
            </div>
            <Reveal as="p" className="text-[1.02rem] leading-[1.75] text-sand/85 md:col-span-4 md:col-start-9" delay={0.1}>
              {property.bedrooms} bedrooms, {property.beds} beds ({property.bedDetail}), {property.bathrooms} bathrooms, for up to {property.maxGuests} guests.
            </Reveal>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
            {[byId["bedroom-one"], byId["bedroom-two"]].map((room, i) => (
              <article key={room.id} className={i === 1 ? "md:pt-16" : ""}>
                <ParallaxImage amount={10} scale={1.1}>
                  <Picture image={room.photos[0]} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5]!" position={i === 1 ? "60% center" : "center"} />
                </ParallaxImage>
                <Reveal className="mt-6">
                  <p className="eyebrow text-sand/85">{room.name}</p>
                  <h3 className="display-sm mt-2 text-ivory">{room.tagline}</h3>
                  <p className="mt-3 max-w-prose text-[1rem] leading-[1.75] text-ivory/80">{room.description}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Rhythm of a stay */}
      <section className="bg-ivory py-20 md:py-28" aria-labelledby="rhythm-heading">
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>The stay</Eyebrow>
            </Reveal>
            <Reveal as="h2" id="rhythm-heading" className="display-md mt-6" delay={0.05}>
              Arrive, settle, <span className="italic font-light">live.</span>
            </Reveal>
          </div>
          <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {rhythm.map((step, i) => (
              <li key={step.time} className={i === 1 ? "md:pt-12" : i === 2 ? "md:pt-24" : ""}>
                <ParallaxImage amount={8}>
                  <Picture image={step.image} sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[4/5]!" />
                </ParallaxImage>
                <Reveal className="mt-5">
                  <p className="eyebrow text-terracotta-deep">
                    {String(i + 1).padStart(2, "0")} — {step.time}
                  </p>
                  <p className="mt-2 text-[0.98rem] leading-[1.7] text-charcoal/80">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-16 flex flex-col gap-4 border-t hairline pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-2xl leading-tight">Ready to plan your Dar es Salaam holiday?</p>
            <div className="flex flex-wrap gap-3">
              <Button to={bookingPath} arrow="right">
                Check dates &amp; enquire
              </Button>
              <Button href={config.airbnbUrl} target="_blank" rel="noopener noreferrer" variant="outline" arrow="external">
                Book on Airbnb
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedPages />
    </>
  );
}
