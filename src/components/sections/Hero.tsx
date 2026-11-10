import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";

export function Hero() {
  const { hero } = site;

  return (
    // Below lg the screen is too narrow for a full-bleed 3:2 photo without cropping the car,
    // so the text stacks above the photo shown at its natural shape; lg+ overlays the text.
    <div className="relative flex flex-col overflow-hidden bg-brand-black lg:h-[100svh] lg:min-h-[480px]">
      <div className="relative order-2 aspect-[3/2] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        <SiteImage
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          labelAlign="top"
        />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-brand-black to-transparent lg:hidden" />
      </div>
      <div className="absolute inset-0 hidden bg-gradient-to-b from-brand-black/90 via-brand-black/65 to-brand-black/25 lg:block" />

      <div className="relative order-1 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-6 pt-12 text-center sm:pt-16 lg:pb-0 lg:pt-24">
        {hero.eyebrow && (
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red [text-shadow:0_1px_6px_rgb(0_0_0/0.8)]">
            {hero.eyebrow}
          </p>
        )}
        <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight text-brand-white sm:text-7xl lg:text-8xl">
          {hero.headline}
        </h1>
        <p className="mt-4 max-w-xl text-base font-medium text-brand-white [text-shadow:0_1px_8px_rgb(0_0_0/0.9)] sm:text-lg">
          {hero.subheadline}
        </p>

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
        className="absolute bottom-8 left-1/2 hidden lg:block -translate-x-1/2 animate-bounce text-brand-white/70 transition-colors hover:text-brand-white"
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
