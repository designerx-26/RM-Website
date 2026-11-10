import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
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
    icon: "M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4",
  },
  {
    title: "Manufacturing",
    description: "Machining, fabrication, and tooling costs for building every subsystem in-house.",
    icon: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z",
  },
  {
    title: "Competition Travel",
    description: "Getting the car, and the team, to events across the country to race.",
    icon: "M3 17h2a2 2 0 104 0h6a2 2 0 104 0h2v-5l-3-5H14v10M3 17V7h11",
  },
];

const cardClasses =
  "group flex h-full flex-col gap-3 rounded-lg border border-brand-grey-800 bg-brand-grey-900/80 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-red";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-brand-red transition-transform group-hover:translate-x-1" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DonatePage() {
  return (
    <>
      <PageHero
        image={{ src: "/RM29/FD1A6998.jpg", alt: "The team walking the car out to the track at competition" }}
        eyebrow="Support the Team"
        title="Donate"
      >
        <p>{site.donate.intro}</p>
      </PageHero>

      <div className="bg-brand-black">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-4">
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal className="h-full">
              {site.donate.url ? (
                <a href={site.donate.url} target="_blank" rel="noopener noreferrer" className={cardClasses}>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Individuals</span>
                  <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight text-brand-white">
                    Give Now <Arrow />
                  </h2>
                  <p className="text-sm text-brand-grey-400">Make an individual gift through RPI&apos;s secure giving page.</p>
                </a>
              ) : (
                <div className="flex h-full flex-col gap-2 rounded-lg border border-dashed border-brand-grey-700 p-7 text-brand-grey-500">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Give Now</h2>
                  <p className="text-sm">Add your donation processor link in site.ts to activate this.</p>
                </div>
              )}
            </Reveal>

            <Reveal delay={75} className="h-full">
              <Link href="/sponsors" className={cardClasses}>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Companies</span>
                <h2 className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight text-brand-white">
                  Become a Sponsor <Arrow />
                </h2>
                <p className="text-sm text-brand-grey-400">Partner with the team as a company or organization.</p>
              </Link>
            </Reveal>
          </div>

          {site.donate.instructions && (
            <p className="mt-6 rounded-lg border-l-4 border-brand-red bg-brand-grey-900 px-5 py-4 text-sm text-brand-grey-300">
              <span className="font-bold text-brand-white">Note: </span>
              {site.donate.instructions}
            </p>
          )}
        </div>
      </div>

      <Section tone="white">
        <SectionHeading eyebrow="Your Impact" title="Where Your Gift Goes" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((item, index) => (
            <Reveal key={item.title} delay={index * 75} className="h-full">
              <div className="h-full rounded-lg border border-brand-grey-100 bg-brand-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                    <path d={item.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-black uppercase tracking-tight text-brand-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-grey-500">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="red">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-4xl">Questions About Giving?</h2>
          <p className="max-w-xl text-brand-white/90">
            Prefer to sponsor in-kind, or have questions about giving? Reach out to us directly.
          </p>
          <Button href={`mailto:${site.contact.email}`} variant="light" className="mt-2 normal-case">
            {site.contact.email}
          </Button>
        </div>
      </Section>
    </>
  );
}
