import type { Stat } from "@/content/site";

export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl font-black tracking-tight text-brand-red sm:text-5xl">
            {stat.value}
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-grey-500">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
