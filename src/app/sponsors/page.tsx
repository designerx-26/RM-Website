import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
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
      <div className="relative flex h-[40vh] min-h-[280px] items-end overflow-hidden bg-brand-black">
        <SiteImage
          src="/Gallery/car1.jpg"
          alt="Car #86 with the team's competition awards"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          labelAlign="top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12">
          <h1 className="text-4xl font-black uppercase tracking-tight text-brand-white sm:text-5xl">
            Our Sponsors
          </h1>
          <p className="mt-4 max-w-2xl text-brand-grey-300">
            {`Thank you to the ${totalPartners}+ sponsors and partners whose generous support makes ${site.meta.name} possible.`}
          </p>
        </div>
      </div>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
              Become a Sponsor
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black sm:text-4xl dark:text-brand-white">
              Partner With Us
            </h2>
            <p className="mt-4 text-brand-grey-700 dark:text-brand-grey-300">
              {site.whySponsor.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={site.sponsorPacket.url} variant="primary">
                {site.sponsorPacket.label}
              </Button>
              <Button href="#sponsor-contact-form" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
          <ul className="flex flex-col gap-3 rounded-xl border border-brand-grey-100 bg-brand-grey-50 p-6 dark:border-brand-grey-800 dark:bg-brand-grey-900">
            {site.whySponsor.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-sm text-brand-grey-700 dark:text-brand-grey-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-brand-red" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="grey">
        <div className="mb-12 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight text-brand-black dark:text-brand-white">
            Thank You
          </h2>
          <p className="mt-3 text-brand-grey-700 dark:text-brand-grey-300">
            Every part on our car, every trip to competition, and every hour in the shop is made
            possible by the companies and organizations below. We're proud to build alongside
            partners who believe in student engineering.
          </p>
        </div>
        <SponsorGrid tiers={site.sponsors} />
      </Section>

      <Section tone="white" id="sponsor-contact-form">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-brand-black sm:text-3xl dark:text-brand-white">
              Interested in Sponsoring?
            </h2>
            <p className="mt-2 text-sm text-brand-grey-500">
              Tell us about your company and how you'd like to support the team.
            </p>
          </div>
          <ContactForm defaultAudience="sponsor" lockAudience />
        </div>
      </Section>
    </>
  );
}
