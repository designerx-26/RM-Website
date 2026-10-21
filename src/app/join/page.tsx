import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: `Join Us | ${site.meta.name}`,
  description: site.meta.description,
};

export default function JoinPage() {
  return (
    <>
      <Section tone="black" className="py-24">
        <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
          Join {site.meta.name}
        </h1>
        <p className="mt-4 max-w-2xl text-brand-grey-300">{site.join.intro}</p>
      </Section>

      <Section tone="white">
        <div className="grid gap-8 sm:grid-cols-2">
          {site.join.steps.map((step, index) => (
            <div key={step.title}>
              <div className="text-4xl font-black text-brand-red">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 text-lg font-bold uppercase tracking-wide text-brand-black">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-brand-grey-500">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="grey">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-black uppercase tracking-tight text-brand-black dark:text-brand-white">
            What We Look For
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {site.join.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-brand-grey-700 dark:text-brand-grey-300">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-brand-red" />
                {req}
              </li>
            ))}
          </ul>
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
      </Section>

      <Section tone="grey">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tight text-brand-black sm:text-3xl dark:text-brand-white">
              Fill Out Our Interest Form
            </h2>
            <p className="mt-2 text-sm text-brand-grey-500">
              Tell us a bit about yourself and we'll follow up with next steps.
            </p>
          </div>
          <ContactForm defaultAudience="student" lockAudience />
        </div>
      </Section>
    </>
  );
}
