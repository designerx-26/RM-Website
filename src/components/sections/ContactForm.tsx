"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

type Audience = "student" | "sponsor";
type Status = "idle" | "submitting" | "success" | "error";

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
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject =
      audience === "student"
        ? `Interested in joining - ${name}`
        : `Sponsorship inquiry - ${organization || name}`;

    if (!site.contact.web3FormsAccessKey) {
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
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.contact.web3FormsAccessKey,
          subject,
          from_name: site.meta.name,
          audience,
          name,
          email,
          organization: audience === "sponsor" ? organization : undefined,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setOrganization("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-brand-grey-200 bg-brand-white px-4 py-2.5 text-sm text-brand-black outline-none transition-colors focus:border-brand-red dark:border-brand-grey-700 dark:bg-brand-black dark:text-brand-white";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-brand-grey-200 bg-brand-white p-8 text-center dark:border-brand-grey-700 dark:bg-brand-black">
        <h3 className="text-lg font-bold uppercase tracking-wide text-brand-black dark:text-brand-white">
          Message Sent
        </h3>
        <p className="text-sm text-brand-grey-500">Thanks for reaching out - we'll get back to you soon.</p>
      </div>
    );
  }

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

      {status === "error" && (
        <p className="text-sm font-medium text-brand-red">
          Something went wrong sending your message. Please try again, or email us directly at{" "}
          {site.contact.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-sm bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
