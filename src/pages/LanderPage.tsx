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
import { HeroSection, MemberResultsSection } from "@/components/sections/HeroAndProof";
import { SocialProofWall } from "@/components/sections/SocialProofWall";
import { ConversionProvider } from "@/lib/conversion-context";

export default function LanderPage() {
  return (
    <ConversionProvider>
      <div className="lander-theme relative min-h-dvh w-full">
        <Header darkHeader />
        <main className="w-full pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-24">
          <HeroSection />
          <MemberResultsSection />
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
