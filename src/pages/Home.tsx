import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/sections/Hero";
import { Intro } from "@/sections/Intro";
import { TheHouse } from "@/sections/TheHouse";
import { GalleryPreview } from "@/sections/GalleryPreview";
import { Amenities } from "@/sections/Amenities";
import { Location } from "@/sections/Location";
import { Atmosphere } from "@/sections/Atmosphere";
import { FinalCta } from "@/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Seo
        description="Olive House is a peaceful two-bedroom holiday home in Kigamboni, Dar es Salaam, five minutes' walk from the beach. Wi-Fi, dedicated workspace, kitchen, free parking, pet-friendly, self check-in."
        path="/"
      />
      <Hero />
      <Intro />
      <TheHouse />
      <GalleryPreview />
      <Amenities />
      <Location />
      <Atmosphere />
      <FinalCta />
    </>
  );
}
