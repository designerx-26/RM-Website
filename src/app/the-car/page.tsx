import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { CarCard } from "@/components/car/CarCard";

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
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-brand-grey-100 bg-brand-black p-10 text-center dark:border-brand-grey-800">
            <h2 className="text-4xl font-black uppercase tracking-tight text-brand-white sm:text-5xl">
              {site.upcomingCar.name}
            </h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest text-brand-red">
              Coming Soon
            </p>
          </div>

          {previousCars.map((previousCar) => (
            <CarCard key={previousCar.id} car={previousCar} />
          ))}
        </div>
      </Section>
    </>
  );
}
