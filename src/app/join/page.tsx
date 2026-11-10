import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import { ContactForm } from "@/components/sections/ContactForm";
import { MeetingCards } from "@/components/sections/MeetingCards";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Get Involved | ${site.meta.name}`,
  description: site.meta.description,
};

const paths = [
  {
    href: "#student-info",
    title: "Join as a Student",
    description: "See how to get on the team, what we're looking for, and when to stop by the shop.",
    image: "/RM29/DSC04867.JPG",
  },
  {
    href: "/sponsors",
    title: "Become a Sponsor",
    description: "Partner with the team and support the next competition car.",
    image: "/RM29/IMG_2406.jpg",
    position: "object-[center_85%]",
  },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        image={{ src: "/RM29/DSC04827.JPG", alt: "Students crowding around the car at a campus recruiting event" }}
        eyebrow="No Experience Required"
        title="Get Involved"
        imageClassName="object-[center_48%]"
      >
        <p>{site.join.intro}</p>
      </PageHero>

      <div className="bg-brand-black">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 pt-4 sm:grid-cols-2">
          {paths.map((path, index) => (
            <Reveal key={path.title} delay={index * 75}>
              <Link
                href={path.href}
                className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-lg border border-brand-grey-800 p-6 transition-colors hover:border-brand-red"
              >
                <SiteImage
                  src={path.image}
                  alt=""
                  fill
                  className={`object-cover ${path.position ?? ""} opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55`}
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
                <div className="relative">
                  <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-brand-white">
                    {path.title}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 text-brand-red transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </h2>
                  <p className="mt-2 text-base text-brand-grey-200">{path.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <div id="student-info" className="scroll-mt-20">
        <Section tone="white">
          <SectionHeading eyebrow="How to Join" title="Two Easy Steps" />
          <div className="relative grid gap-6 sm:grid-cols-2">
            {site.join.steps.map((step, index) => (
              <Reveal key={step.title} delay={(index % 2) * 75} className="h-full">
                <div className="relative h-full overflow-hidden rounded-lg border border-brand-grey-100 bg-brand-grey-50 p-8">
                  <span
                    className="pointer-events-none absolute -right-2 -top-1 select-none text-[8rem] font-black leading-none text-brand-red/10"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-sm font-black text-brand-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-black uppercase tracking-tight text-brand-black">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-brand-grey-700">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="black">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <SectionHeading eyebrow="Who Fits In" title="What We Look For" align="left" tone="dark" className="" />
            <ul className="flex flex-col gap-3">
              {site.join.requirements.map((req) => (
                <li
                  key={req}
                  className="flex items-center gap-4 rounded-lg border border-brand-grey-800 bg-brand-grey-900 px-5 py-4 text-brand-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-brand-red" aria-hidden="true">
                    <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section tone="white">
          <SectionHeading eyebrow="Come By" title="Weekly Schedule" align="left" />
          <MeetingCards />
          <div className="mt-10 flex justify-center">
            <Button href="#join-contact-form" variant="primary">
              Contact Us
            </Button>
          </div>
        </Section>
      </div>

      <Section tone="grey" id="join-contact-form">
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="Can't Make It?" title="Fill Out Our Interest Form" className="mb-8">
            <p className="text-sm">Tell us a bit about yourself and we&apos;ll follow up with next steps.</p>
          </SectionHeading>
          <div className="rounded-xl border border-brand-grey-100 bg-brand-white p-6 shadow-sm sm:p-8">
            <ContactForm defaultAudience="student" lockAudience />
          </div>
        </div>
      </Section>
    </>
  );
}
