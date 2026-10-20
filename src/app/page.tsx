import { site } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { VideoSection } from "@/components/sections/VideoSection";
import { HomeCards } from "@/components/sections/HomeCards";
import { SponsorMarquee } from "@/components/sponsors/SponsorMarquee";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Hero />

      <Section tone="white" id="about" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">Who We Are</p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black sm:text-4xl">
            {site.meta.name}
          </h2>
          <p className="mt-6 text-lg text-brand-grey-700">{site.about.intro[0]}</p>
          <Button href="/about" variant="outline" className="mt-8">
            Learn More
          </Button>
        </div>
      </Section>

      <div className="bg-brand-black">
        <VideoSection />
      </div>

      <Section tone="white">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-brand-black sm:text-4xl">
            Explore the Team
          </h2>
        </div>
        <HomeCards />
      </Section>

      <Section tone="grey">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
            Thank You to Our Sponsors
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-black sm:text-4xl dark:text-brand-white">
            Our Partners
          </h2>
        </div>
        <SponsorMarquee />
      </Section>

      <Section tone="red">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Interested in Joining?
          </h2>
          <p className="max-w-xl text-brand-white/90">{site.join.intro}</p>
          <Button href={site.joinCta.href} variant="outline-light">
            {site.joinCta.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
