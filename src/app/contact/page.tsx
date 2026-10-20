import type { Metadata } from "next";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: `Contact | ${site.meta.name}`,
  description: site.meta.description,
};

const socialLinks = [
  { platform: "instagram", href: site.social.instagram },
  { platform: "facebook", href: site.social.facebook },
  { platform: "linkedin", href: site.social.linkedin },
  { platform: "youtube", href: site.social.youtube },
  { platform: "tiktok", href: site.social.tiktok },
] as const;

const shopAddress = "2368 Burdett Ave, Troy, NY";
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(shopAddress)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <Section tone="black" className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">Contact Us</h1>
            <p className="mt-2 max-w-xl text-sm text-brand-grey-300">{site.contact.intro}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={`mailto:${site.contact.email}`}
              className="text-sm font-semibold text-brand-white hover:text-brand-red"
            >
              {site.contact.email}
            </a>
            <span className="text-sm text-brand-grey-300">{site.contact.address}</span>
            <div className="flex items-center gap-3">
              {socialLinks
                .filter((link) => link.href)
                .map((link) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="text-brand-grey-300 transition-colors hover:text-brand-red"
                  >
                    <SocialIcon platform={link.platform} className="h-5 w-5" />
                  </a>
                ))}
            </div>
            <Button href={site.donateCta.href} variant="outline-light">
              {site.donateCta.label}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">Come By</p>
          <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-brand-black sm:text-3xl dark:text-brand-white">
            Weekly Schedule
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {site.contact.meetings.map((meeting) => (
            <div
              key={meeting.title}
              className="flex flex-col gap-2 border border-brand-grey-100 border-t-4 border-t-brand-red bg-brand-white p-5 shadow-sm dark:border-brand-grey-800 dark:bg-brand-black"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-brand-red">
                {meeting.day}
              </p>
              <h3 className="text-base font-bold uppercase tracking-wide text-brand-black dark:text-brand-white">
                {meeting.title}
              </h3>
              <p className="text-sm text-brand-grey-500">{meeting.description}</p>
              <div className="mt-1 flex flex-col gap-1 border-t border-brand-grey-100 pt-2 text-sm font-semibold text-brand-black dark:border-brand-grey-800 dark:text-brand-white">
                <span>{meeting.time}</span>
                <span className="text-brand-grey-500">{meeting.location}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-brand-grey-100 dark:border-brand-grey-800">
          <iframe
            title="Rensselaer Motorsport shop location"
            src={mapSrc}
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      <Section tone="grey">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-brand-black sm:text-3xl dark:text-brand-white">
              Send Us a Message
            </h2>
            <p className="mt-2 text-sm text-brand-grey-500">
              Let us know whether you're interested in joining or looking to sponsor the team.
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
