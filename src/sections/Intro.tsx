import { property } from "@/data/property";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

export function Intro() {
  return (
    <section id="intro" className="relative overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="intro-heading">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Welcome to Olive House</Eyebrow>
            </Reveal>
            <h2 id="intro-heading" className="display-lg mt-6 max-w-[14ch]">
              <SplitWords text="Some places invite you to do less." italic={[5]} />
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-24">
            <Reveal stagger={0.12} className="flex flex-col gap-5 text-[1.02rem] leading-[1.75] text-charcoal/85">
              {property.description.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
              <p className="eyebrow mt-2 text-olive-600">
                {property.locality} · {property.city} · {property.country}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-16 grid gap-6 md:mt-24 md:grid-cols-12 md:gap-8">
          <ParallaxImage className="md:col-span-8 md:col-start-2" amount={10}>
            <Picture image="living-room" sizes="(min-width: 768px) 66vw, 100vw" className="h-full" />
          </ParallaxImage>

          <div className="relative isolate md:col-span-3 md:col-start-10 md:self-end md:pb-10">
            <div aria-hidden="true" className="absolute -inset-x-4 -bottom-4 top-1/3 -z-10 bg-sand/60 md:-left-10 md:-right-6" />
            <ParallaxImage className="w-3/4 md:w-full" amount={14} scale={1.12}>
              <Picture image="bedroom-one-detail" sizes="(min-width: 768px) 25vw, 75vw" />
            </ParallaxImage>
            <Reveal as="p" className="mt-4 font-serif text-lg italic text-olive-800">
              Textured walls, warm lamps, cool green linen.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
