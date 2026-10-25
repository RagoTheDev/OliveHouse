import { amenities, extraAmenities, goodToKnow } from "@/data/property";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";

export function Amenities() {
  return (
    <section id="amenities" className="bg-ivory-light py-24 md:py-36" aria-labelledby="amenities-heading">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Reveal>
              <Eyebrow>Amenities</Eyebrow>
            </Reveal>
            <h2 id="amenities-heading" className="display-md mt-6">
              <SplitWords text="Thoughtfully equipped for longer, slower stays." italic={[1]} />
            </h2>
            <Reveal as="p" className="mt-6 max-w-sm text-[1.02rem] leading-[1.75] text-charcoal/80" delay={0.1}>
              Everything below is verified on the listing. If it is not here, please ask before you count on it.
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal as="ul" stagger={0.08} className="divide-y hairline border-y hairline">
            {amenities.map(({ id, label, description, icon: Icon }) => (
              <li key={id} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-6 sm:grid-cols-[auto_12rem_1fr] sm:items-baseline sm:gap-x-8">
                <Icon className="size-5 self-start text-olive sm:translate-y-0.5" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-serif text-2xl leading-tight">{label}</h3>
                <p className="col-start-2 text-[0.95rem] leading-relaxed text-charcoal/75 sm:col-start-3">{description}</p>
              </li>
            ))}
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {extraAmenities.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.08}>
                <p className="eyebrow text-olive-600">{group.group}</p>
                <ul className="mt-4 flex flex-col gap-2 text-[0.92rem] leading-snug text-charcoal/80">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 border-l-2 border-terracotta bg-sand/40 px-6 py-6 md:px-8">
            <p className="eyebrow text-terracotta-deep">Good to know</p>
            <ul className="mt-3 flex flex-col gap-1.5 font-serif text-lg leading-snug text-charcoal/85">
              {goodToKnow.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
