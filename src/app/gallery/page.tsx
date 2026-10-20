import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";

export const metadata: Metadata = {
  title: `Gallery | ${site.meta.name}`,
  description: site.meta.description,
};

export default function GalleryPage() {
  return (
    <>
      <Section tone="black" className="py-24">
        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">Gallery</h1>
        <p className="mt-4 max-w-2xl text-brand-grey-300">
          Moments from the shop, the track, and everywhere in between.
        </p>
      </Section>

      <Section tone="black">
        <MasonryGallery items={site.gallery} />
      </Section>
    </>
  );
}
