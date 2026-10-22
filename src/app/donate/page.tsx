import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

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
      <Section tone="black">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
            Support the Team
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">Donate</h1>
          <p className="max-w-xl text-brand-grey-300">{site.donate.intro}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
          <Reveal>
            {site.donate.url ? (
              <a
                href={site.donate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 rounded-sm border border-brand-grey-800 bg-brand-grey-900 p-6 transition-colors hover:border-brand-red"
              >
                <h2 className="text-xl font-black uppercase tracking-tight text-brand-white">
                  Give Now
                </h2>
                <p className="text-sm text-brand-grey-400">
                  Make an individual gift through RPI's secure giving page.
                </p>
              </a>
            ) : (
              <div className="flex flex-col gap-2 rounded-sm border border-dashed border-brand-grey-700 p-6 text-brand-grey-500">
                <h2 className="text-xl font-black uppercase tracking-tight">Give Now</h2>
                <p className="text-sm">Add your donation processor link in site.ts to activate this.</p>
              </div>
            )}
          </Reveal>

          <Reveal delay={75}>
            <a
              href="/sponsors"
              className="flex flex-col gap-2 rounded-sm border border-brand-grey-800 bg-brand-grey-900 p-6 transition-colors hover:border-brand-red"
            >
              <h2 className="text-xl font-black uppercase tracking-tight text-brand-white">
                Become a Sponsor
              </h2>
              <p className="text-sm text-brand-grey-400">
                Partner with the team as a company or organization.
              </p>
            </a>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
            Your Impact
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black sm:text-4xl dark:text-brand-white">
            Where Your Gift Goes
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {impact.map((item, index) => (
            <Reveal key={item.title} delay={index * 75}>
              <div className="rounded-sm border border-brand-grey-100 border-t-4 border-t-brand-red bg-brand-white p-6 shadow-sm dark:border-brand-grey-800 dark:bg-brand-black">
                <h3 className="text-lg font-bold uppercase tracking-wide text-brand-black dark:text-brand-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-grey-500">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {site.donate.instructions && (
        <Section tone="grey">
          <div className="mx-auto max-w-xl text-center">
            <p className="rounded-lg border border-brand-grey-200 bg-brand-white p-4 text-sm text-brand-grey-700 dark:border-brand-grey-800 dark:bg-brand-black dark:text-brand-grey-300">
              {site.donate.instructions}
            </p>
          </div>
        </Section>
      )}

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
