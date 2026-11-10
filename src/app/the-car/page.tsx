import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CarCard } from "@/components/car/CarCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `The Car | ${site.meta.name}`,
  description: site.meta.description,
};

export default function TheCarPage() {
  const car = site.cars[0];

  return (
    <>
      <PageHero
        image={{ src: car?.heroPhoto ?? "", alt: `${car?.name ?? site.meta.name} on track` }}
        eyebrow={`${car?.category} · ${car?.year}`}
        title="The Car"
        className="lg:h-[clamp(420px,38vw,80vh)]"
      />

      <Section tone="grey">
        <div className="flex flex-col gap-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-brand-black px-8 py-14 sm:px-12 sm:py-20">
              {/* Oversized outlined name as a backdrop for the teaser. */}
              <span
                className="pointer-events-none absolute -bottom-8 -right-4 select-none text-[9rem] font-black leading-none tracking-tighter text-transparent sm:text-[12rem] lg:text-[14rem]"
                style={{ WebkitTextStroke: "2px rgba(200, 16, 46, 0.35)" }}
                aria-hidden="true"
              >
                {site.upcomingCar.name}
              </span>
              <div className="absolute inset-y-0 left-0 w-1.5 bg-brand-red" aria-hidden="true" />
              <div className="relative max-w-lg">
                <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-brand-red-light">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
                  </span>
                  Next Up &middot; {site.upcomingCar.year}
                </p>
                <h3 className="mt-4 text-5xl font-black uppercase tracking-tight text-brand-white sm:text-7xl">
                  {site.upcomingCar.name}
                </h3>
                <p className="mt-4 text-lg text-brand-grey-200">
                  Currently in design. Follow along as the team takes the next car from a blank sheet to
                  the track.
                </p>
              </div>
            </div>
          </Reveal>

          <SectionHeading eyebrow="The Lineup" title="Our Cars" className="mb-0 mt-6" />

          {site.cars.map((listedCar) => (
            <Reveal key={listedCar.id}>
              <CarCard car={listedCar} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
