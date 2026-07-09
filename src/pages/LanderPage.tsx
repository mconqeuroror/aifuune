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
      <div className="min-h-screen bg-background text-foreground">
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
