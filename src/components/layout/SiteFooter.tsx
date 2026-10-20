import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

const socialLinks = [
  { platform: "instagram", href: site.social.instagram },
  { platform: "facebook", href: site.social.facebook },
  { platform: "linkedin", href: site.social.linkedin },
  { platform: "youtube", href: site.social.youtube },
  { platform: "tiktok", href: site.social.tiktok },
] as const;

const footerColumns = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Cars", href: "/the-car" },
      { label: "Team", href: "/team" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Join the Team", href: "/join" },
      { label: "Our Sponsors", href: "/sponsors" },
      { label: "Donate", href: "/donate" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: site.contact.email, href: `mailto:${site.contact.email}` },
      { label: site.contact.address, href: "" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src={site.meta.logoDark}
              alt={site.meta.name}
              width={900}
              height={300}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-brand-grey-300">{site.meta.tagline}</p>
            <div className="mt-6 flex items-center gap-4">
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
                    <SocialIcon platform={link.platform} />
                  </a>
                ))}
              {site.social.email && (
                <a
                  href={site.social.email}
                  aria-label="email"
                  className="text-brand-grey-300 transition-colors hover:text-brand-red"
                >
                  <SocialIcon platform="email" />
                </a>
              )}
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.heading}
              className={column.heading === "Contact" ? "col-span-2 sm:col-span-1" : undefined}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-grey-500">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-grey-300 transition-colors hover:text-brand-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label} className="text-sm text-brand-grey-500">
                      {link.label}
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center border-t border-brand-grey-900 pt-6">
          <p className="text-xs text-brand-grey-500">
            &copy; {new Date().getFullYear()} {site.meta.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
