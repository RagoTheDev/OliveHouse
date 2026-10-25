import { bookingPath } from "@/data/navigation";
import { config } from "@/lib/config";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";

export function FinalCta() {
  return (
    <section className="relative isolate min-h-[85svh] overflow-hidden bg-olive-950 text-ivory" aria-labelledby="cta-heading">
      <ParallaxImage className="absolute inset-0 h-full w-full" amount={14} scale={1.16} reveal={false}>
        <Picture image="bedroom-one" sizes="100vw" position="center 40%" className="h-full w-full" imgClassName="min-h-full" style={{ aspectRatio: "auto" }} />
      </ParallaxImage>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,36,25,0.9)_0%,rgba(31,36,25,0.5)_50%,rgba(31,36,25,0.25)_100%)]" />

      <div className="container-x relative flex min-h-[85svh] flex-col items-start justify-end py-20 md:py-28">
        <h2 id="cta-heading" className="display-lg max-w-[12ch] text-ivory">
          <SplitWords text="Your next quiet escape begins here." italic={[2]} />
        </h2>
        <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6" delay={0.2}>
          <Button to={bookingPath} variant="ivory" size="lg" arrow="right">
            Book Your Stay
          </Button>
          <a
            href={config.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[0.8rem] uppercase tracking-[0.18em] text-sand"
          >
            Or book on Airbnb
          </a>
        </Reveal>
      </div>
    </section>
  );
}
