import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: `Donate | ${site.meta.name}`,
  description: site.meta.description,
};

const impact = [
  {
    title: "Materials",
    description: "Raw stock, fasteners, and components that become the next competition car.",
  },
  {
    title: "Manufacturing",
    description: "Machining, fabrication, and tooling costs for building every subsystem in-house.",
  },
  {
    title: "Competition Travel",
    description: "Getting the car, and the team, to events across the country to race.",
  },
];

export default function DonatePage() {
  return (
    <>
      <Section tone="black" className="py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-red">Support the Team</p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">Donate</h1>
        <p className="mt-4 max-w-2xl text-brand-grey-300">{site.donate.intro}</p>
      </Section>

      <Section tone="white">
        <div className="grid gap-6 sm:grid-cols-3">
          {impact.map((item) => (
            <div
              key={item.title}
              className="border border-brand-grey-100 border-t-4 border-t-brand-red bg-brand-white p-6 shadow-sm dark:border-brand-grey-800 dark:bg-brand-black"
            >
              <h3 className="text-lg font-bold uppercase tracking-wide text-brand-black dark:text-brand-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-brand-grey-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="grey">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight text-brand-black sm:text-3xl dark:text-brand-white">
            Make a Gift
          </h2>

          {site.donate.url ? (
            <Button href={site.donate.url} variant="primary" external className="rounded-full">
              Give Now
            </Button>
          ) : (
            <div className="flex w-full flex-col items-center gap-4 border-2 border-dashed border-brand-grey-300 p-10 dark:border-brand-grey-700">
              <span className="text-xs font-medium uppercase tracking-wide text-brand-grey-500">
                Add your donation processor link in site.ts to activate this button
              </span>
            </div>
          )}

          {site.donate.instructions && (
            <p className="w-full rounded-lg border border-brand-grey-200 bg-brand-white p-4 text-sm text-brand-grey-700 dark:border-brand-grey-800 dark:bg-brand-black dark:text-brand-grey-300">
              {site.donate.instructions}
            </p>
          )}
        </div>
      </Section>

      <Section tone="red">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Questions About Giving?
          </h2>
          <p className="max-w-xl text-brand-white/90">
            Prefer to sponsor in-kind, or have questions about giving? Reach out to us directly.
          </p>
          <Button href={`mailto:${site.contact.email}`} variant="outline-light" className="mt-2">
            {site.contact.email}
          </Button>
        </div>
      </Section>
    </>
  );
}
