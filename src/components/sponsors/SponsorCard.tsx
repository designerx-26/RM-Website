import type { Sponsor } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <div className="group relative flex h-32 w-full items-center justify-center rounded-xl border border-brand-grey-300 bg-brand-grey-300 p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-brand-grey-700 dark:bg-brand-grey-800">
      {sponsor.logo ? (
        <SiteImage
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          width={200}
          height={100}
          className="max-h-24 w-full object-contain"
        />
      ) : (
        <span className="text-sm font-bold leading-snug text-brand-black dark:text-brand-white">
          {sponsor.name}
        </span>
      )}
      {sponsor.url && (
        <span className="absolute right-2 top-2 text-brand-grey-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-brand-grey-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );

  if (!sponsor.url) {
    return content;
  }

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${sponsor.name}`}
    >
      {content}
    </a>
  );
}
