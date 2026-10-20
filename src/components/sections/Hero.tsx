import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";

export function Hero() {
  const { hero } = site;

  return (
    <div className="relative flex h-[85svh] min-h-[520px] items-start justify-center overflow-hidden bg-brand-black sm:h-[90svh] lg:h-[100svh]">
      <SiteImage
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
        labelAlign="top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/55 to-brand-black/25" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-24 text-center sm:pt-28">
        {hero.eyebrow && (
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
            {hero.eyebrow}
          </p>
        )}
        <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight text-brand-white sm:text-7xl lg:text-8xl">
          {hero.headline}
        </h1>
        <p className="mt-4 max-w-xl text-base text-brand-grey-300 sm:text-lg">{hero.subheadline}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
          </Button>
          {hero.secondaryCta && (
            <Button href={hero.secondaryCta.href} variant="outline-light">
              {hero.secondaryCta.label}
            </Button>
          )}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-brand-white/70 transition-colors hover:text-brand-white"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
