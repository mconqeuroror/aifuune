import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollCaptureModal } from "@/components/ScrollCaptureModal";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import {
  BenefitGrid,
  EmailCaptureSection,
} from "@/components/sections/BenefitsAndCapture";
import { FAQSection } from "@/components/sections/FAQSection";
import { FounderStory } from "@/components/sections/FounderStory";
import { HeroSection, ProofCollage } from "@/components/sections/HeroAndProof";
import { SocialProofWall } from "@/components/sections/SocialProofWall";
import { ConversionProvider } from "@/lib/conversion-context";

export default function LanderPage() {
  return (
    <ConversionProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 size-72 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <Header />
        <main>
          <HeroSection />
          <ProofCollage />
          <BenefitGrid />
          <EmailCaptureSection />
          <FounderStory />
          <SocialProofWall />
          <FAQSection />
        </main>
        <Footer />
        <StickyCtaBar />
        <ScrollCaptureModal />
      </div>
    </ConversionProvider>
  );
}
