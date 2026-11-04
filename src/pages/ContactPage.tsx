import { Mail } from "lucide-react";
import { Seo } from "@/components/layout/Seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/animations/Reveal";
import { SplitWords } from "@/components/animations/SplitWords";
import { RelatedPages } from "@/components/layout/RelatedPages";
import { Button } from "@/components/ui/Button";
import { AirbnbIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { property } from "@/data/property";
import { config, hasEmail } from "@/lib/config";
import { whatsappContactUrl } from "@/lib/booking/channels";

export default function ContactPage() {
  const wa = whatsappContactUrl();
  const channels = [
    wa && {
      id: "whatsapp",
      icon: WhatsAppIcon,
      label: "WhatsApp",
      detail: "Quickest for questions and booking enquiries.",
      href: wa,
      external: true,
    },
    hasEmail && {
      id: "email",
      icon: Mail,
      label: "E-mail",
      detail: config.contactEmail ?? "",
      href: `mailto:${config.contactEmail}`,
      external: false,
    },
    {
      id: "airbnb",
      icon: AirbnbIcon,
      label: "Airbnb",
      detail: "Message the host, check availability and pay securely.",
      href: config.airbnbUrl,
      external: true,
    },
  ].filter((c): c is Exclude<typeof c, false | null | ""> => Boolean(c));

  return (
    <>
      <Seo
        absoluteTitle="Contact Olive House Dar es Salaam | Kigamboni Holiday Home"
        description="Contact Olive House in Dar es Salaam for accommodation enquiries, booking information and help with your stay in Kigamboni."
      />

      <section className="bg-ivory pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-28 md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="contact-heading">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow>Contact Olive House · Dar es Salaam</Eyebrow>
              </Reveal>
              <h1 id="contact-heading" className="display-lg mt-6">
                <SplitWords text="Questions, dates, directions: just ask." italic={[3]} />
              </h1>
              <Reveal as="p" className="lede mt-6 max-w-xl text-charcoal/80" delay={0.1}>
                For Olive House booking enquiries, availability or help planning a stay in Kigamboni, Dar es Salaam, reach {property.hostFirstName} directly through any of the channels below.
              </Reveal>
            </div>
            <Reveal className="md:col-span-4 md:col-start-9" delay={0.15}>
              <Picture image="olive-house-kigamboni-exterior" sizes="(min-width: 768px) 30vw, 100vw" className="aspect-[4/3]!" imgClassName="object-[42%_60%]" />
            </Reveal>
          </div>

          <Reveal as="ul" stagger={0.08} className="mt-16 grid gap-px overflow-hidden rounded-sm border hairline bg-charcoal/10 sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2 lg:grid-cols-3 lg:[&>li:last-child:nth-child(3n+1)]:col-span-3 lg:[&>li:last-child:nth-child(3n+2)]:col-span-2 lg:[&>li:last-child:nth-child(3n)]:col-span-1">
            {channels.map(({ id, icon: Icon, label, detail, href, external }) => (
              <li key={id} className="bg-ivory-light">
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-sand/40 md:p-8"
                >
                  <Icon className="size-6 text-olive" />
                  <span>
                    <span className="block font-serif text-2xl leading-tight">{label}</span>
                    <span className="mt-1 block break-words text-[0.92rem] text-charcoal/70">{detail}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="bg-ivory-light p-6 md:p-8">
              <p className="eyebrow text-olive-600">Check-in and check-out</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/80">
                Check-in {property.checkIn}. Check-out {property.checkOut}. Self check-in with building staff, who are available around the clock.
              </p>
            </li>
            <li className="bg-ivory-light p-6 md:p-8">
              <p className="eyebrow text-olive-600">Where</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/80">
                Mikadi Street, {property.locality}, {property.city}, {property.country}.{" "}
                {config.googleMapsUrl && (
                  <a href={config.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-charcoal">
                    Open in Google Maps
                  </a>
                )}
              </p>
            </li>
          </Reveal>
        </div>
      </section>

      <section className="bg-olive-900 py-16 text-ivory md:py-24" aria-labelledby="enquiry-heading">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow light>Ready to book?</Eyebrow>
            </Reveal>
            <Reveal as="h2" id="enquiry-heading" className="display-md mt-5 text-ivory" delay={0.05}>
              Send a dated enquiry in <span className="italic font-light">two minutes.</span>
            </Reveal>
            <Reveal as="p" className="mt-4 max-w-xl text-[1.02rem] leading-[1.75] text-sand/85" delay={0.1}>
              The booking page checks your dates and guest count, then drafts the enquiry for WhatsApp or passes your dates to Airbnb. Nothing is confirmed until the host replies.
            </Reveal>
          </div>
          <Reveal className="flex flex-wrap gap-3 md:col-span-4 md:col-start-9 md:justify-end" delay={0.15}>
            <Button to="/book" variant="ivory" size="lg" arrow="right">
              Book Your Stay
            </Button>
          </Reveal>
        </div>
      </section>

      <RelatedPages />
    </>
  );
}
