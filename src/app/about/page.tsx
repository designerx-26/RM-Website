import type { Metadata } from "next";
import { site } from "@/content/site";
import { getStats, memberCount } from "@/content/stats";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { StatBand } from "@/components/ui/StatBand";
import { SiteImage } from "@/components/ui/SiteImage";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `About | ${site.meta.name}`,
  description: site.meta.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image={site.about.heroImage}
        eyebrow={site.meta.name}
        title="About Us"
        className="h-[clamp(420px,38vw,80vh)]"
        imageClassName="object-[center_88%]"
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-brand-grey-700 sm:text-xl">{site.about.aboutUs.replace("{members}", `${memberCount}+`)}</p>
        </div>
      </Section>

      <Section tone="grey">
        <SectionHeading eyebrow="Our Team" title="By the Numbers" />
        <StatBand stats={getStats()} />
        <div className="mt-12 text-center">
          <Button href="/team" variant="outline">
            Meet the Team
          </Button>
        </div>
      </Section>

      <Section tone="black">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-grey-900">
              <SiteImage
                src="/RM29/FD1A6514.jpg"
                alt="Rolling the car out at FSAE Michigan"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </Reveal>
          <SectionHeading eyebrow="The Competition" title={site.about.whatIsFsae.title} align="left" tone="dark" className="">
            <p>{site.about.whatIsFsae.body}</p>
          </SectionHeading>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="What Drives Us" title={site.about.ourWork.title}>
          <p>{site.about.ourWork.body}</p>
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.about.values.map((value, index) => (
            <Reveal key={value.title} delay={index * 75} className="h-full">
              <div className="group h-full rounded-lg border border-brand-grey-100 bg-brand-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-red hover:shadow-lg">
                <span className="text-4xl font-black text-brand-red/25 transition-colors group-hover:text-brand-red">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-black uppercase tracking-tight text-brand-black">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-grey-500">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="grey">
        <SectionHeading eyebrow="How We're Organized" title="Our Subsystems">
          <p>Every part of the car is owned by a dedicated subsystem team.</p>
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.about.subsystems.map((subsystem, index) => (
            <Reveal key={subsystem.name} delay={(index % 3) * 60} className="h-full">
              <div className="h-full rounded-lg border-l-4 border-brand-red bg-brand-white p-5 shadow-sm transition duration-300 hover:shadow-md">
                <h3 className="text-base font-black uppercase tracking-tight text-brand-black">
                  {subsystem.name}
                </h3>
                <p className="mt-2 text-sm text-brand-grey-500">{subsystem.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <SectionHeading eyebrow={`Since ${site.about.foundingYear}`} title="Our History" align="left" className="">
            <p>{site.about.history}</p>
          </SectionHeading>
          <Reveal>
            <div className="relative">
              <div className="absolute -bottom-3 -left-3 h-full w-full rounded-lg border-2 border-brand-red" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-grey-900">
                <SiteImage
                  src="/RM29/cardriving.JPG"
                  alt="Autocross in the rain"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="black">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who Joins" title="Our Majors" align="left" tone="dark" className="mb-6" />
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {site.about.majors.map((major) => (
                <li
                  key={major}
                  className="flex items-center gap-3 rounded-md border border-brand-grey-800 bg-brand-grey-900 px-4 py-3 text-sm text-brand-grey-100"
                >
                  <span className="h-1.5 w-1.5 shrink-0 bg-brand-red" aria-hidden="true" />
                  {major}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Alumni" title="Where We've Gone" align="left" tone="dark" className="mb-6">
              <p className="text-sm">Recent alumni destinations include:</p>
            </SectionHeading>
            <div className="flex flex-wrap gap-2">
              {site.about.alumniEmployers.map((employer) => (
                <span
                  key={employer}
                  className="rounded-full border border-brand-grey-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-white transition-colors hover:border-brand-red hover:bg-brand-red"
                >
                  {employer}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
