import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { CarCard } from "@/components/car/CarCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `The Car | ${site.meta.name}`,
  description: site.meta.description,
};

export default function TheCarPage() {
  const car = site.cars[0];
  const previousCars = [...site.cars].reverse();

  return (
    <>
      <div className="relative flex h-[70vh] min-h-[420px] items-end overflow-hidden bg-brand-black">
        <SiteImage
          src={car?.heroPhoto ?? ""}
          alt={`${car?.name ?? site.meta.name} on track`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          labelAlign="top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
            {car?.category} &middot; {car?.year}
          </p>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-brand-white sm:text-6xl">
            The Car
          </h1>
        </div>
      </div>

      <Section tone="grey">
        <div className="flex flex-col gap-10">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-brand-grey-100 bg-brand-white shadow-sm dark:border-brand-grey-800 dark:bg-brand-black">
              <div className="grid gap-8 md:grid-cols-2 md:min-h-[480px]">
                <div className="aspect-video bg-brand-black md:aspect-auto" />

                <div className="flex flex-col justify-start gap-6 p-8">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
                      Next Up &middot; {site.upcomingCar.year}
                    </p>
                    <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black sm:text-4xl dark:text-brand-white">
                      {site.upcomingCar.name}
                    </h3>
                    <p className="mt-3 text-brand-grey-500">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {previousCars.map((previousCar) => (
            <Reveal key={previousCar.id}>
              <CarCard car={previousCar} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
