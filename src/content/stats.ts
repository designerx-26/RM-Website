import { site } from "@/content/site";

/**
 * Current roster size: unique people across every subteam on the Team page. Someone with
 * positions on two teams has two cards but is counted once.
 */
export const memberCount = new Set(site.team.flatMap((subteam) => subteam.members.map((m) => m.name))).size;

/** Exact sponsor count across every tier, shared by the home stat and home card. */
export const sponsorCount = site.sponsors.reduce((sum, tier) => sum + tier.sponsors.length, 0);

/**
 * Competition cars built so far. Cars are numbered in order (RM22 was unveiled in 2017 as the
 * team's 22nd competition car), so the newest car's number is the count. Adding RM30 to
 * site.cars bumps it automatically. Not one-per-year: RM25 raced 2020-2022, and RM21b was a
 * rework of RM21.
 */
export const carsBuilt = Math.max(...site.cars.map((car) => Number(car.name.replace(/\D/g, "")) || 0));

/**
 * Years with an in-person Formula SAE result: every year from the first competition through the
 * latest competition year listed in the cars' results, minus the missed seasons in site.ts.
 * Adding next season's results to a car card bumps it automatically.
 */
export const yearsCompeting = (() => {
  const resultYears = site.cars.flatMap((car) =>
    (car.results ?? []).map((event) => Number(event.competition.match(/\b(19|20)\d{2}\b/)?.[0] ?? 0)),
  );
  const latest = Math.max(...resultYears);
  const { firstCompetitionYear, missedCompetitionYears } = site.about;
  return latest - firstCompetitionYear + 1 - missedCompetitionYears.filter((y) => y <= latest).length;
})();

/** Site stats with the live values filled in. */
export function getStats() {
  return site.stats.map((stat) => {
    if (stat.label === "Founded") return { ...stat, value: `${site.about.foundingYear}` };
    if (stat.label === "Years Competing") return { ...stat, value: `${yearsCompeting}` };
    if (stat.label === "Cars Built") return { ...stat, value: `${carsBuilt}` };
    if (stat.label === "Active Members") return { ...stat, value: `${memberCount}+` };
    if (stat.label === "Sponsors & Partners") return { ...stat, value: `${sponsorCount}` };
    return stat;
  });
}
