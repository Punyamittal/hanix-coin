import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { TokenomicsSection } from "@/components/sections/tokenomics";
import { RoadmapSection } from "@/components/sections/roadmap";
import { WhitepaperSection } from "@/components/sections/whitepaper";
import { FaqSection } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-background focus:bg-gold focus:px-4 focus:py-2 focus:font-head focus:uppercase focus:text-background focus:shadow-md"
      >
        Skip to content
      </a>
      <Navbar />
      <main className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-[-10%] top-[20%] h-[40vh] w-[40vw] rounded-full bg-gold/[0.06] blur-[120px]" />
          <div className="absolute right-[-15%] top-[55%] h-[35vh] w-[35vw] rounded-full bg-amber-700/[0.08] blur-[130px]" />
          <div className="absolute bottom-[5%] left-[30%] h-[30vh] w-[40vw] rounded-full bg-gold/[0.05] blur-[110px]" />
        </div>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TokenomicsSection />
        <RoadmapSection />
        <WhitepaperSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
