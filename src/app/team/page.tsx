import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { TeamGrid } from "@/components/team/TeamGrid";

export const metadata: Metadata = {
  title: `Team | ${site.meta.name}`,
  description: site.meta.description,
};

export default function TeamPage() {
  return (
    <>
      <div className="relative flex h-[50vh] min-h-[320px] items-end overflow-hidden bg-brand-black">
        <SiteImage
          src="/team-pic.jpg"
          alt="The Rensselaer Motorsport team celebrating with the car"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          labelAlign="top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12">
          <h1 className="text-4xl font-black uppercase tracking-tight text-brand-white sm:text-5xl">
            Our Team
          </h1>
          <p className="mt-4 max-w-2xl text-brand-grey-300">
            Meet the students designing, building, and racing our car.
          </p>
        </div>
      </div>

      <Section tone="white">
        <TeamGrid subteams={site.team} />
      </Section>
    </>
  );
}
