import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { TeamGrid } from "@/components/team/TeamGrid";

export const metadata: Metadata = {
  title: `Team | ${site.meta.name}`,
  description:
    "Meet the Rensselaer Motorsport team: the RPI students who design, build, and race our Formula SAE car.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        image={{ src: "/RM29/team-pic.jpg", alt: "The Rensselaer Motorsport team celebrating with the car" }}
        eyebrow={site.meta.name}
        title="Our Team"
        className="lg:h-[calc(100vh-88px)] lg:min-h-[480px]"
        imageClassName="object-[center_38%]"
      >
        <p>Meet the students designing, building, and racing our car.</p>
      </PageHero>

      <Section tone="white">
        <TeamGrid subteams={site.team} />
      </Section>
    </>
  );
}
