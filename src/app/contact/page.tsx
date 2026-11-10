import type { Metadata } from "next";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "@/components/sections/ContactForm";
import { MeetingCards } from "@/components/sections/MeetingCards";

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
      <PageHero
        image={{ src: "/RM29/DSC02050.JPG", alt: "Car #86 rounding a corner on the competition track" }}
        imageClassName="object-[center_45%]"
        contentPosition="top"
        eyebrow="Get in Touch"
        title="Contact Us"
      >
        <p>{site.contact.intro}</p>
      </PageHero>

      <div className="bg-brand-black">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border-y border-brand-grey-800 bg-brand-grey-800 sm:grid-cols-3">
          <a
            href={`mailto:${site.contact.email}`}
            className="group flex flex-col gap-2 bg-brand-black px-6 py-8 transition-colors hover:bg-brand-grey-900"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">Email</span>
            <span className="break-all text-lg font-semibold sm:text-xl text-brand-white group-hover:text-brand-red">
              {site.contact.email}
            </span>
          </a>
          <div className="flex flex-col gap-2 bg-brand-black px-6 py-8">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">Shop</span>
            <span className="text-lg font-semibold text-brand-white sm:text-xl">{shopAddress}</span>
            <span className="text-base text-brand-grey-400">{site.contact.address}</span>
          </div>
          <div className="flex flex-col gap-3 bg-brand-black px-6 py-8">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">Follow</span>
            <div className="flex items-center gap-6">
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
                    <SocialIcon platform={link.platform} className="h-7 w-7" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Section tone="white">
        <SectionHeading eyebrow="Come By" title="Weekly Schedule" align="left" />
        <MeetingCards />

        <div className="mt-10 overflow-hidden rounded-lg border border-brand-grey-100 shadow-sm">
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
          <SectionHeading eyebrow="Reach Out" title="Send Us a Message" className="mb-8">
            <p className="text-sm">
              Let us know whether you&apos;re interested in joining or looking to sponsor the team.
            </p>
          </SectionHeading>
          <div className="rounded-xl border border-brand-grey-100 bg-brand-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section tone="red">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">Want to Support the Team?</h2>
            <p className="mt-2 text-brand-white/90">Every gift goes straight into building the next car.</p>
          </div>
          <Button href={site.donateCta.href} variant="light">
            {site.donateCta.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
