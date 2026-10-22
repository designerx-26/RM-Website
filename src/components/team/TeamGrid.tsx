import type { Subteam } from "@/content/site";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { Reveal } from "@/components/ui/Reveal";

export function TeamGrid({ subteams }: { subteams: Subteam[] }) {
  return (
    <div className="flex flex-col gap-16">
      {subteams.map((subteam) => {
        const isFullMembers = subteam.name === "Full Members";

        return (
          <Reveal key={subteam.name}>
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-brand-red">
                  {subteam.name}
                </h2>
              </div>
              <div
                className={
                  isFullMembers
                    ? "flex flex-wrap justify-center gap-6"
                    : "flex flex-wrap justify-center gap-6 lg:mx-auto lg:w-[calc(75%-0.375rem)]"
                }
              >
                {subteam.members.map((member) => (
                  <div
                    key={`${subteam.name}-${member.name}`}
                    className={
                      isFullMembers
                        ? "flex-[0_0_calc(50%-0.75rem)] sm:flex-[0_0_calc(33.333%-1rem)] lg:flex-[0_0_calc(25%-1.125rem)]"
                        : "flex-[0_0_calc(50%-0.75rem)] sm:flex-[0_0_calc(33.333%-1rem)]"
                    }
                  >
                    <TeamMemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
