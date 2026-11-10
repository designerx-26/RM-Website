import { site } from "@/content/site";

/** Current roster size, counted from every subteam on the Team page. */
export const memberCount = site.team.reduce((sum, subteam) => sum + subteam.members.length, 0);

/** Site stats with the sponsor count, years competing, and member count filled in from live data. */
export function getStats() {
  const sponsorCount = site.sponsors.reduce((sum, tier) => sum + tier.sponsors.length, 0);
  const yearsCompeting = new Date().getFullYear() - site.about.foundingYear;
  return site.stats.map((stat) => {
    if (stat.label === "Sponsors & Partners") return { ...stat, value: `${sponsorCount}+` };
    if (stat.label === "Years Competing") return { ...stat, value: `${yearsCompeting}+` };
    if (stat.label === "Active Members") return { ...stat, value: `${memberCount}+` };
    return stat;
  });
}
