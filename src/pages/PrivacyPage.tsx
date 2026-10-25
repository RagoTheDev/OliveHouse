import { Seo } from "@/components/layout/Seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { property } from "@/data/property";

export default function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy" description="How the Olive House website handles your information." />
      <section className="bg-ivory pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-36 md:pt-[calc(var(--header-h)+5rem)]" aria-labelledby="privacy-heading">
        <div className="container-x max-w-3xl">
          <Reveal>
            <Eyebrow>Privacy</Eyebrow>
          </Reveal>
          <Reveal as="h1" id="privacy-heading" className="display-md mt-6" delay={0.05}>
            Short, because there is little to tell.
          </Reveal>
          <Reveal stagger={0.08} className="mt-10 flex flex-col gap-6 text-[1.02rem] leading-[1.75] text-charcoal/85">
            <p>
              This website does not use cookies, analytics or advertising trackers. We do not store anything you type on this site on a server of ours.
            </p>
            <p>
              When you send a booking inquiry, the dates and details you enter are placed into a message that opens in WhatsApp or your e-mail app, or are passed to the official Airbnb listing as part of the link. From that point the respective service's privacy policy applies, and the host receives only what you choose to send.
            </p>
            <p>
              The map on the Location section loads tiles from OpenStreetMap, which receives your IP address and the map area requested, as with any image loaded from a third party. Fonts are loaded from Google Fonts in the same way.
            </p>
            <p>
              Questions about your data or a stay at {property.name} can be sent to the host through the Airbnb listing.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
