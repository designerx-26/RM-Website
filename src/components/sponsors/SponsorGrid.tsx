import type { SponsorTier } from "@/content/site";
import { SponsorCard } from "@/components/sponsors/SponsorCard";

const tierBadgeStyles: Record<string, string> = {
  Title: "bg-brand-red text-brand-white",
  "Level 3": "bg-brand-grey-700 text-brand-white",
  "Level 2": "bg-blue-700 text-brand-white",
  "Level 1": "bg-amber-700 text-brand-white",
};

export function SponsorGrid({ tiers }: { tiers: SponsorTier[] }) {
  return (
    <div className="flex flex-col gap-14">
      {tiers.map((tier) => (
        <div key={tier.tier}>
          <div className="mb-6 flex items-center gap-4">
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${
                tierBadgeStyles[tier.tier] ?? "bg-brand-grey-700 text-brand-white"
              }`}
            >
              {tier.tier} Sponsors
            </span>
            <div className="h-px flex-1 bg-brand-grey-100 dark:bg-brand-grey-800" />
            <span className="text-sm text-brand-grey-500">
              {tier.sponsors.length} partner{tier.sponsors.length === 1 ? "" : "s"}
            </span>
          </div>
          {tier.blurb && <p className="mb-4 text-sm text-brand-grey-500">{tier.blurb}</p>}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {tier.sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
