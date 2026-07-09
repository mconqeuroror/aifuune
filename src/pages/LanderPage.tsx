import { Footer } from "@/components/Footer";
import { AmbientBlobs } from "@/components/AmbientBlobs";
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
      <div className="relative min-h-dvh w-full bg-background text-foreground">
        <AmbientBlobs
          blobs={[
            { className: "left-0 top-[55%] size-80 -translate-x-1/3 bg-accent/12" },
            { className: "right-0 top-[50%] size-72 translate-x-1/4 bg-cyan-300/15" },
          ]}
        />
        <Header />
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
