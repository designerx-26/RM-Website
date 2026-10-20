import type { Car } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";

export function CarSpecCard({ car }: { car: Car }) {
  return (
    <div className="grid gap-8 border border-brand-grey-100 dark:border-brand-grey-900 md:grid-cols-2">
      <div className="relative aspect-video bg-brand-grey-100 dark:bg-brand-grey-900 md:aspect-auto">
        <SiteImage
          src={car.photo}
          alt={`Photo of ${car.name}`}
          fill
          className="h-full w-full object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-col justify-center p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
          {car.category} &middot; {car.year}
        </p>
        <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black dark:text-brand-white">
          {car.name}
        </h3>
        {car.tagline && (
          <p className="mt-3 text-brand-grey-500">{car.tagline}</p>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-4">
          {car.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-brand-grey-500">
                {spec.label}
              </dt>
              <dd className="text-lg font-bold text-brand-black dark:text-brand-white">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        {car.features.length > 0 && (
          <ul className="mt-6 flex flex-col gap-2 border-t border-brand-grey-100 pt-6 dark:border-brand-grey-900">
            {car.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-brand-grey-500">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-brand-red" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
