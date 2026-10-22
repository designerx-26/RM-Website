import type { Car } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";

export function CarCard({ car }: { car: Car }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-grey-100 bg-brand-white shadow-sm dark:border-brand-grey-800 dark:bg-brand-black">
      <div className="grid gap-8 md:grid-cols-2 md:min-h-[480px]">
        <div className="relative aspect-video bg-brand-grey-100 dark:bg-brand-grey-900 md:aspect-auto">
          <SiteImage
            src={car.photo}
            alt={`Photo of ${car.name}`}
            fill
            className="h-full w-full object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div className="flex flex-col justify-start gap-6 p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
              {car.category} &middot; {car.year}
            </p>
            <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black dark:text-brand-white">
              {car.name}
            </h3>
            {car.tagline && <p className="mt-3 text-brand-grey-500">{car.tagline}</p>}
          </div>

          {car.goals && car.goals.length > 0 && (
            <div className="border-t border-brand-grey-100 pt-6 dark:border-brand-grey-900">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-grey-500">
                Notable Achievements
              </h4>
              <ul className="mt-3 flex flex-col gap-2">
                {car.goals.map((goal) => (
                  <li key={goal.competition} className="flex items-start gap-2 text-sm text-brand-grey-700 dark:text-brand-grey-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-brand-red" />
                    <span>
                      <span className="font-bold text-brand-black dark:text-brand-white">{goal.result}</span>{" "}
                      - {goal.competition}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
