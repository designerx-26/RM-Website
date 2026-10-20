import type { SponsorTier } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";

interface SponsorStripProps {
  tiers: SponsorTier[];
  compact?: boolean;
}

export function SponsorStrip({ tiers, compact = false }: SponsorStripProps) {
  return (
    <div className="flex flex-col gap-10">
      {tiers.map((tier) => (
        <div key={tier.tier}>
          {!compact && (
            <div className="mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-red">
                {tier.tier} Sponsors
              </h3>
              {tier.blurb && (
                <p className="mt-1 text-sm text-brand-grey-500">{tier.blurb}</p>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-6">
            {tier.sponsors.map((sponsor) => {
              const logo = (
                <SiteImage
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  width={160}
                  height={80}
                  className="h-20 w-40 object-contain grayscale transition hover:grayscale-0"
                />
              );
              return sponsor.url ? (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {logo}
                </a>
              ) : (
                <div key={sponsor.name}>{logo}</div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
