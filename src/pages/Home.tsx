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
        absoluteTitle="Olive House Dar es Salaam | Holiday Home in Kigamboni"
        description="Olive House is a comfortable two-bedroom holiday home in Dar es Salaam, in the quiet Kigamboni neighbourhood, a short walk from the beach."
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
