import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SponsorGrid } from "@/components/sponsors/SponsorGrid";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: `Sponsors | ${site.meta.name}`,
  description: site.meta.description,
};

const totalPartners = site.sponsors.reduce((sum, tier) => sum + tier.sponsors.length, 0);

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        image={{ src: "/RM29/car1.jpg", alt: "Car #86 and its sponsor livery with the team's competition awards" }}
        imageClassName="object-[center_82%]"
        eyebrow={`${totalPartners}+ Partners`}
        title="Our Sponsors"
      >
        <p>{`Thank you to the ${totalPartners}+ sponsors and partners whose generous support makes ${site.meta.name} possible.`}</p>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Become a Sponsor" title="Partner With Us" align="left" className="">
              <p>{site.whySponsor.intro}</p>
            </SectionHeading>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={site.sponsorPacket.url} variant="primary" external>
                {site.sponsorPacket.label}
              </Button>
              <Button href="#sponsor-contact-form" variant="outline">
                Sponsor Us
              </Button>
            </div>
          </div>
          <div className="rounded-xl bg-brand-black p-7 shadow-xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red-light">What Sponsors Get</p>
            <ul className="mt-5 flex flex-col gap-4">
              {site.whySponsor.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-brand-grey-100">
                  <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true">
                    <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="grey">
        <SectionHeading eyebrow="Our Partners" title="Thank You" className="mb-12">
          <p>
            Every part on our car, every trip to competition, and every hour in the shop is made
            possible by the companies and organizations below. We&apos;re proud to build alongside
            partners who believe in student engineering.
          </p>
        </SectionHeading>
        <SponsorGrid tiers={site.sponsors} />
      </Section>

      <Section tone="white" id="sponsor-contact-form">
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="Get in Touch" title="Interested in Sponsoring?" className="mb-8">
            <p className="text-sm">
              Tell us about your company and how you&apos;d like to support the team.
            </p>
          </SectionHeading>
          <div className="rounded-xl border border-brand-grey-100 bg-brand-white p-6 shadow-sm sm:p-8">
            <ContactForm defaultAudience="sponsor" lockAudience />
          </div>
        </div>
      </Section>
    </>
  );
}
