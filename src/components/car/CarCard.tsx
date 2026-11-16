import type { Car } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";

/**
 * Dark "livery" card for the car lineup: photo with a diagonal cut into the details panel,
 * an oversized outlined car name behind the text, and a red sweep along the bottom on hover.
 * `reverse` puts the photo on the right (desktop only) so stacked cards alternate.
 * The photo column is wide and the details compact so the panel stays close to the photos'
 * 3:2 shape; pick card photos with some room around the car so nothing gets cropped.
 */
export function CarCard({ car, reverse = false }: { car: Car; reverse?: boolean }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-brand-grey-900 ring-1 ring-brand-grey-800 transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-red/10 hover:ring-brand-red/50">
      <div
        className={`grid md:min-h-[420px] ${reverse ? "md:grid-cols-[1fr_1.35fr]" : "md:grid-cols-[1.35fr_1fr]"}`}
      >
        <div
          className={`relative aspect-[3/2] overflow-hidden bg-brand-black md:aspect-auto ${
            reverse
              ? "md:order-2 md:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]"
              : "md:[clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]"
          }`}
        >
          <SiteImage
            src={car.photo}
            alt={`Photo of ${car.name}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 60vw, 100vw"
            imgStyle={car.photoPosition ? { objectPosition: car.photoPosition } : undefined}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent md:from-brand-black/30" />
          <span
            className={`absolute top-5 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-white shadow-lg ${
              reverse ? "left-5 md:left-auto md:right-5" : "left-5"
            }`}
          >
            {car.year}
          </span>
        </div>

        <div className="relative flex flex-col justify-center gap-5 overflow-hidden p-7 sm:p-9">
          {/* Oversized outlined name as a backdrop, matching the "Next Up" teaser. The font's letters
              are built from overlapping shapes, so a plain text stroke traces the overlaps too; painting
              the stroke first and then filling with the card color hides those inner lines. The stroke
              is twice the visible width because the fill covers its inner half. */}
          <span
            className="pointer-events-none absolute -bottom-6 -right-3 select-none text-[7rem] font-black leading-none tracking-tighter text-brand-grey-900 sm:text-[8.5rem]"
            style={{ WebkitTextStroke: "3px rgba(200, 16, 46, 0.3)", paintOrder: "stroke fill" }}
            aria-hidden="true"
          >
            {car.name}
          </span>

          <div className="relative">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-red-light sm:text-sm">
              <span className="h-0.5 w-6 bg-brand-red" aria-hidden="true" />
              {car.category}
            </p>
            <h3 className="mt-2 text-5xl font-black uppercase tracking-tight text-brand-white sm:text-6xl">
              {car.name}
            </h3>
            {car.tagline && <p className="mt-3 text-lg leading-relaxed text-brand-grey-200">{car.tagline}</p>}
          </div>

          {car.results && car.results.length > 0 && (
            <div className="relative border-t border-brand-grey-800 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-grey-400">
                Results and Achievements
              </h4>
              <div className="mt-3 flex flex-col gap-4">
                {car.results.map((event) => (
                  <div key={event.competition}>
                    <p className="text-sm font-bold text-brand-red-light">{event.competition}</p>
                    <ul className="mt-1.5 flex flex-col gap-1.5">
                      {event.results.map((item) => (
                        <li key={item.title} className="flex items-baseline gap-3 text-sm leading-snug">
                          <span className="h-3 w-1 shrink-0 -skew-x-12 self-center bg-brand-red" aria-hidden="true" />
                          <span>
                            <span className="font-bold text-brand-white">{item.title}</span>
                            {item.detail && <span className="text-brand-grey-300"> &middot; {item.detail}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </article>
  );
}
