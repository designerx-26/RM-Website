import Link from "next/link";
import { site } from "@/content/site";
import { SponsorCard } from "@/components/sponsors/SponsorCard";

export function SponsorMarquee() {
  const topSponsors = site.sponsors[0]?.sponsors ?? [];
  const track = [...topSponsors, ...topSponsors];

  return (
    <div className="flex flex-col gap-8">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((sponsor, i) => (
            <div key={`${sponsor.name}-${i}`} className="w-48 flex-shrink-0">
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          href={site.sponsorPacket.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-red hover:text-brand-red-dark"
        >
          {site.sponsorPacket.label}
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
