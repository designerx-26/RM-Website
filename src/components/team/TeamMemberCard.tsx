import type { TeamMember } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const roles = member.role
    ? member.role.split(",").map((r) => r.trim()).filter(Boolean)
    : [];

  const scale = member.photoScale ?? 1;
  const position = member.photoPosition ?? "50% 20%";
  const photoBg = member.photoBg;

  // Phones: one horizontal card per row (photo left, details right) so every card matches.
  // sm+: vertical cards in a grid; h-full + mt-auto keep cards in a row equal height with
  // the LinkedIn buttons lined up along the bottom.
  return (
    <div className="flex h-full flex-row overflow-hidden rounded-2xl bg-brand-white shadow-sm ring-1 ring-brand-grey-100 dark:bg-brand-grey-900 dark:ring-brand-grey-900 sm:flex-col">
      <div
        className="relative min-h-36 w-28 shrink-0 overflow-hidden bg-brand-grey-100 sm:aspect-square sm:min-h-0 sm:w-full dark:bg-brand-grey-800"
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
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-4 py-3 sm:pb-4">
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
        <p className="text-sm leading-tight text-brand-grey-500">
          {member.major} &apos;{member.gradYear.slice(-2)}
          {member.additionalDegrees?.map((degree) => (
            <span key={degree.major}>
              <br />
              {degree.major} &apos;{degree.gradYear.slice(-2)}
            </span>
          ))}
        </p>
        {member.linkedin && (
          <div className="mt-auto pt-2">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-4 py-1.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-blue/90 sm:flex sm:py-2"
            >
              <SocialIcon platform="linkedin" className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
