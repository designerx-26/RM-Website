import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { CarCard } from "@/components/car/CarCard";
import { CarSilhouette } from "@/components/car/CarSilhouette";

export const metadata: Metadata = {
  title: `The Car | ${site.meta.name}`,
  description: site.meta.description,
};

export default function TheCarPage() {
  const previousCars = [...site.cars].reverse();

  return (
    <>
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-8 bg-brand-black px-6 py-20 text-center">
        <CarSilhouette className="h-28 w-full max-w-xl text-brand-grey-700 sm:h-40" />
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
            Coming Soon
          </p>
          <h1 className="mt-2 text-5xl font-black uppercase tracking-tight text-brand-white sm:text-7xl">
            {site.upcomingCar.name}
          </h1>
        </div>
      </div>

      <Section tone="grey">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
            Previous Cars
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black sm:text-4xl dark:text-brand-white">
            Our Race History
          </h2>
        </div>
        <div className="flex flex-col gap-10">
          {previousCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </Section>
    </>
  );
}
