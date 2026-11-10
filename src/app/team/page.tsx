import type { Metadata } from "next";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { TeamGrid } from "@/components/team/TeamGrid";

export const metadata: Metadata = {
  title: `Team | ${site.meta.name}`,
  description: site.meta.description,
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        image={{ src: "/RM29/team-pic.jpg", alt: "The Rensselaer Motorsport team celebrating with the car" }}
        eyebrow={site.meta.name}
        title="Our Team"
        className="h-[calc(100vh-88px)] min-h-[480px]"
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
