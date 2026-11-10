import { site } from "@/content/site";
import { getStats } from "@/content/stats";
import { Hero } from "@/components/sections/Hero";
import { VideoSection } from "@/components/sections/VideoSection";
import { HomeCards } from "@/components/sections/HomeCards";
import { SponsorMarquee } from "@/components/sponsors/SponsorMarquee";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeferredImage } from "@/components/ui/DeferredImage";
import { StatBand } from "@/components/ui/StatBand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <Section tone="white" id="about" className="scroll-mt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who We Are" title={site.meta.name} align="left" className="">
              <p className="text-lg">{site.about.intro[0]}</p>
            </SectionHeading>
            <Button href="/about" variant="outline" className="mt-8">
              More About Us
            </Button>
          </div>
          <Reveal>
            <div className="relative">
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border-2 border-brand-red" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-grey-900">
                <DeferredImage
                  src="/RM29/FD1A8003.jpg"
                  alt="The team with car #86 at FSAE Michigan"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-brand-grey-100 pt-12">
          <StatBand stats={getStats()} />
        </div>
      </Section>

      <div className="bg-brand-black">
        <VideoSection />
      </div>

      <Section tone="white">
        <SectionHeading eyebrow="Get to Know Us" title="Explore the Team" />
        <HomeCards />
      </Section>

      <Section tone="grey">
        <SectionHeading eyebrow="Thank You to Our Sponsors" title="Our Partners" />
        <SponsorMarquee />
      </Section>

      <Section tone="red">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Interested in Joining?
          </h2>
          <p className="max-w-xl text-brand-white/90">{site.join.intro}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={site.joinCta.href} variant="outline-light">
              {site.joinCta.label}
            </Button>
            <Button href="/contact" variant="light">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
