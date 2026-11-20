import type { TeamMember } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const roles = member.role
    ? member.role.split(",").map((r) => r.trim()).filter(Boolean)
    : [];

  const degrees = [{ major: member.major, gradYear: member.gradYear }, ...(member.additionalDegrees ?? [])];

  const scale = member.photoScale ?? 1;
  const position = member.photoPosition ?? "50% 20%";
  const photoBg = member.photoBg;

  // Phones: one horizontal card per row (photo left, details right) so every card matches. The photo
  // is an inset, rounded square thumbnail, the same square crop as desktop (see
  // scripts/crop-headshots.mjs), and a fixed size so every headshot is framed the same. Inset rather
  // than flush with the card edge, so cards with longer text read as a thumbnail beside taller text
  // instead of a photo that stops short of the bottom.
  // sm+: vertical cards in a grid; h-full + mt-auto keep cards in a row equal height with
  // the LinkedIn buttons lined up along the bottom.
  return (
    <div className="flex h-full flex-row gap-3 overflow-hidden rounded-2xl bg-brand-white p-3 shadow-sm ring-1 ring-brand-grey-100 dark:bg-brand-grey-900 dark:ring-brand-grey-900 sm:flex-col sm:gap-0 sm:p-0">
      <div
        className="relative h-28 w-28 shrink-0 self-start overflow-hidden rounded-xl bg-brand-grey-100 sm:aspect-square sm:h-auto sm:w-full sm:self-auto sm:rounded-none dark:bg-brand-grey-800"
        style={photoBg ? { backgroundColor: photoBg } : undefined}
      >
        {scale < 1 && (
          <SiteImage
            src={member.photo}
            alt=""
            width={400}
            height={400}
            className="absolute inset-0 h-full w-full object-cover"
            imgStyle={{ transform: "scale(1.3)", filter: "blur(20px) brightness(0.9)" }}
          />
        )}
        <SiteImage
          src={member.photo}
          alt={`Photo of ${member.name}`}
          width={400}
          height={400}
          className="absolute inset-0 h-full w-full object-cover"
          imgStyle={
            scale !== 1
              ? { transform: `scale(${scale})`, transformOrigin: position }
              : undefined
          }
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 pr-1 sm:px-4 sm:py-3 sm:pb-4">
        <h3 className="text-lg font-bold leading-tight text-brand-black dark:text-brand-white">
          {member.name}
        </h3>
        {roles.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {roles.map((role) => (
              <p
                key={role}
                className="text-sm font-bold uppercase leading-tight tracking-wide text-brand-red"
              >
                {role}
              </p>
            ))}
          </div>
        )}
        {/* One row per degree: major wrapping on the left, class-year tag pinned to the right, so
            long majors and second degrees stay aligned instead of running together. */}
        <ul className="flex flex-col gap-1.5">
          {degrees.map((degree) => (
            <li
              key={degree.major}
              className="flex items-start justify-between gap-3 text-sm leading-snug text-brand-grey-600 dark:text-brand-grey-300"
            >
              <span>{degree.major}</span>
              <span className="mt-px shrink-0 rounded bg-brand-grey-100 px-1.5 py-px text-xs font-bold tabular-nums text-brand-grey-700 dark:bg-brand-grey-800 dark:text-brand-grey-200">
                &apos;{degree.gradYear.slice(-2)}
              </span>
            </li>
          ))}
        </ul>
        {(member.linkedin || member.email) && (
          <div className="mt-auto flex gap-2 pt-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-4 py-1.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-blue/90 sm:flex-1 sm:py-2"
              >
                <SocialIcon platform="linkedin" className="h-4 w-4" />
                LinkedIn
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                title={member.email}
                className={`inline-flex items-center justify-center gap-2 rounded-full border border-brand-grey-200 text-sm font-semibold text-brand-black transition-colors hover:border-brand-red hover:text-brand-red ${
                  member.linkedin ? "h-8 w-8 shrink-0 sm:h-9 sm:w-9" : "px-4 py-1.5 sm:flex-1 sm:py-2"
                }`}
              >
                <SocialIcon platform="email" className="h-4 w-4" />
                {!member.linkedin && "Email"}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
