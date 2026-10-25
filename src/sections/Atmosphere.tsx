import { publishedReviews } from "@/data/reviews";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/animations/Reveal";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import type { ImageKey } from "@/data/images.generated";

const moments: { time: string; title: string; body: string; image: ImageKey; sizes: string }[] = [
  {
    time: "Morning",
    title: "Wake slowly. Walk to the water.",
    body: "The beach is five minutes on foot, before the day warms up. Come back for coffee at the kitchen window.",
    image: "bedroom-one-detail",
    sizes: "(min-width: 768px) 30vw, 80vw",
  },
  {
    time: "Midday",
    title: "Work with the fan turning.",
    body: "A dedicated desk, quick Wi-Fi and a quiet street. Long calls, deep work, or nothing at all.",
    image: "living-room-detail",
    sizes: "(min-width: 768px) 40vw, 100vw",
  },
  {
    time: "Evening",
    title: "Cook something. Sit out front.",
    body: "The kitchen has what you need. Afterwards, the veranda, the plants, and the sound of the neighbourhood settling.",
    image: "kitchen",
    sizes: "(min-width: 768px) 26vw, 70vw",
  },
];

export function Atmosphere() {
  return (
    <section className="overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="atmosphere-heading">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>A day at Olive House</Eyebrow>
          </Reveal>
          <Reveal as="h2" id="atmosphere-heading" className="display-md mt-6" delay={0.05}>
            Unhurried, <span className="italic font-light">by design.</span>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-28">
          {/* Morning */}
          <article className="md:col-span-4 md:col-start-1">
            <ParallaxImage className="w-4/5 md:w-full" amount={10}>
              <Picture image={moments[0].image} sizes={moments[0].sizes} className="aspect-[4/5]!" />
            </ParallaxImage>
            <Moment {...moments[0]} />
          </article>

          {/* Midday */}
          <article className="md:col-span-6 md:col-start-6 md:pt-28">
            <ParallaxImage amount={8}>
              <Picture image={moments[1].image} sizes={moments[1].sizes} className="aspect-[4/3]!" />
            </ParallaxImage>
            <Moment {...moments[1]} />
          </article>

          {/* Evening */}
          <article className="md:col-span-7 md:col-start-1 md:-mt-10">
            <div className="flex flex-col md:flex-row-reverse md:items-end md:gap-10">
              <ParallaxImage className="w-3/5 md:w-[46%] md:shrink-0" amount={12}>
                <Picture image={moments[2].image} sizes={moments[2].sizes} className="aspect-[3/4]!" />
              </ParallaxImage>
              <div className="md:flex-1">
                <Moment {...moments[2]} />
              </div>
            </div>
          </article>

          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="font-serif text-[clamp(1.6rem,2.6vw,2.3rem)] leading-tight text-olive-800">
              “Olive House is a comfortable place to slow down, work quietly, unwind, or enjoy time with a few friends.”
            </p>
            <p className="eyebrow mt-5 text-olive-600">From the listing</p>
          </Reveal>
        </div>

        {publishedReviews.length > 0 && (
          <div className="mt-24 grid gap-10 border-t hairline pt-16 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <Eyebrow>Guest notes</Eyebrow>
            </Reveal>
            <Reveal as="ul" stagger={0.12} className="flex flex-col gap-12 md:col-span-8 md:col-start-5">
              {publishedReviews.map((r) => (
                <li key={r.author + r.date}>
                  <blockquote className="font-serif text-[clamp(1.35rem,2vw,1.8rem)] leading-snug">“{r.quote}”</blockquote>
                  <p className="mt-4 text-[0.78rem] uppercase tracking-[0.16em] text-olive-600">
                    {r.author}, {r.origin} · via {r.source}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

function Moment({ time, title, body }: { time: string; title: string; body: string }) {
  return (
    <Reveal className="mt-6 max-w-md">
      <p className="eyebrow text-terracotta-deep">{time}</p>
      <h3 className="mt-2 font-serif text-[1.65rem] leading-tight">{title}</h3>
      <p className="mt-3 text-[0.98rem] leading-[1.7] text-charcoal/80">{body}</p>
    </Reveal>
  );
}
