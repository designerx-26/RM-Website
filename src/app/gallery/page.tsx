import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { YearlyGallery } from "@/components/gallery/YearlyGallery";

export const metadata: Metadata = {
  title: `Gallery | ${site.meta.name}`,
  description: site.meta.description,
};

// "2025-2026" -> "25-26", matching the gallery's year keys.
const carLabels = Object.fromEntries(
  site.cars.map((car) => [car.year.split("-").map((y) => y.slice(2)).join("-"), car.name]),
);

export default function GalleryPage() {
  return (
    <>
      {/* Title pinned to the top (over the trees) so it doesn't cover the car. */}
      <PageHero
        image={{ src: site.galleryHero, alt: "Car #27 at the overlook" }}
        title="Gallery"
        imageClassName="object-[center_72%]"
        contentPosition="top"
      >
        <p>Moments from the shop, the track, and everywhere in between.</p>
      </PageHero>

      <div className="bg-brand-black">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pb-24">
          <YearlyGallery items={site.gallery} years={site.galleryYears} labels={carLabels} />
        </div>
      </div>
    </>
  );
}
