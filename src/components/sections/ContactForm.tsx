"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

type Audience = "student" | "sponsor";

interface ContactFormProps {
  defaultAudience?: Audience;
  lockAudience?: boolean;
}

export function ContactForm({ defaultAudience = "student", lockAudience = false }: ContactFormProps) {
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject =
      audience === "student"
        ? `Interested in joining - ${name}`
        : `Sponsorship inquiry - ${organization || name}`;

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      audience === "sponsor" ? `Organization: ${organization}` : null,
      "",
      message,
    ].filter((line): line is string => line !== null);

    const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  };

  const inputClasses =
    "w-full rounded-lg border border-brand-grey-200 bg-brand-white px-4 py-2.5 text-sm text-brand-black outline-none transition-colors focus:border-brand-red dark:border-brand-grey-700 dark:bg-brand-black dark:text-brand-white";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {!lockAudience && (
        <div className="inline-flex self-start rounded-full border border-brand-grey-200 p-1 dark:border-brand-grey-700">
          {(["student", "sponsor"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAudience(option)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                audience === option
                  ? "bg-brand-red text-brand-white"
                  : "text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white"
              }`}
            >
              {option === "student" ? "I'm a Student" : "I'm a Sponsor"}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-brand-grey-500">
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1.5 ${inputClasses}`}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-brand-grey-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1.5 ${inputClasses}`}
          />
        </div>
      </div>

      {audience === "sponsor" && (
        <div>
          <label
            htmlFor="organization"
            className="text-xs font-semibold uppercase tracking-wide text-brand-grey-500"
          >
            Company / Organization
          </label>
          <input
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className={`mt-1.5 ${inputClasses}`}
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-brand-grey-500">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            audience === "student"
              ? "Tell us a bit about your background and what you're interested in working on."
              : "Tell us about your company and how you'd like to support the team."
          }
          className={`mt-1.5 resize-none ${inputClasses}`}
        />
      </div>

      <button
        type="submit"
        className="self-start rounded-sm bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-white transition-colors hover:bg-brand-red-dark"
      >
        Send Message
      </button>
    </form>
  );
}
