import Link from "next/link";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { DeferredImage } from "@/components/ui/DeferredImage";

export function HomeCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {site.homeCards.map((card, index) => {
        // First two cards get the wide slots; the rest share the second row.
        const featured = index < 2;
        return (
          <Reveal
            key={card.href}
            delay={index * 75}
            className={featured ? "lg:col-span-3" : "lg:col-span-2"}
          >
            <Link
              href={card.href}
              className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-lg bg-brand-black p-6 ${
                featured ? "min-h-[300px] sm:min-h-[340px]" : "min-h-[280px]"
              }`}
            >
              <DeferredImage
                src={card.image}
                alt=""
                fill
                className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={featured ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/5" />
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100" />

              <div className="relative">
                <h3 className="text-xl font-black uppercase tracking-tight text-brand-white sm:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-2 max-w-md text-base text-brand-grey-100">{card.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-white transition-colors group-hover:text-brand-red">
                  {card.cta}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
