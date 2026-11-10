import type { Car } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";

export function CarCard({ car }: { car: Car }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-grey-100 bg-brand-white shadow-sm">
      <div className="grid md:grid-cols-2 md:min-h-[480px]">
        <div className="group relative aspect-video overflow-hidden bg-brand-grey-900 md:aspect-auto">
          <SiteImage
            src={car.photo}
            alt={`Photo of ${car.name}`}
            fill
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-white">
            {car.year}
          </span>
        </div>

        <div className="flex flex-col justify-start gap-6 p-8 sm:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-red">{car.category}</p>
            <h3 className="mt-2 text-4xl font-black uppercase tracking-tight text-brand-black sm:text-5xl">
              {car.name}
            </h3>
            {car.tagline && <p className="mt-3 leading-relaxed text-brand-grey-500">{car.tagline}</p>}
          </div>

          {car.goals && car.goals.length > 0 && (
            <div className="border-t border-brand-grey-100 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-grey-500">
                Notable Achievements
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {car.goals.map((goal) => (
                  <li key={goal.competition} className="flex items-start gap-3 text-sm text-brand-grey-700">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true">
                      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>
                      <span className="font-bold text-brand-black">{goal.result}</span> - {goal.competition}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {car.specs.length > 0 && (
        <dl className="grid grid-cols-2 border-t border-brand-grey-100 bg-brand-black sm:grid-cols-3 lg:grid-cols-5">
          {car.specs.map((spec) => (
            <div key={spec.label} className="border-b border-r border-brand-grey-800 px-6 py-5 lg:border-b-0">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">{spec.label}</dt>
              <dd className="mt-1.5 text-sm font-semibold text-brand-white">{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
