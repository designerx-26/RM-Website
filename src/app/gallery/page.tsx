import type { Metadata } from "next";
import { site } from "@/content/site";
import { YearlyGallery } from "@/components/gallery/YearlyGallery";

export const metadata: Metadata = {
  title: `Gallery | ${site.meta.name}`,
  description: site.meta.description,
};

export default function GalleryPage() {
  return (
    <>
      <div className="bg-brand-black">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-10 sm:pb-20">
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">Gallery</h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-grey-300">
            Moments from the shop, the track, and everywhere in between.
          </p>

          <div className="mt-8">
            <YearlyGallery items={site.gallery} years={site.galleryYears} />
          </div>
        </div>
      </div>
    </>
  );
}
