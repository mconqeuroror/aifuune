import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { STICKY_CTA_LABEL } from "@/lib/content";
import { useConversion } from "@/lib/conversion-context";

export function StickyCtaBar() {
  const { converted } = useConversion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (converted) {
      setVisible(false);
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [converted]);

  if (!visible || converted) return null;

  function scrollToHero() {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    const input = document.querySelector<HTMLInputElement>(
      '#hero input[type="email"]',
    );
    window.setTimeout(() => input?.focus(), 400);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/6 glass-header-scrolled px-4 py-3 transition-transform">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground/85">
          Ešte si si nepozrel video?
        </p>
        <Button
          size="lg"
          onClick={scrollToHero}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="shrink-0"
        >
          {hovered ? `${STICKY_CTA_LABEL} →` : STICKY_CTA_LABEL}
        </Button>
      </div>
    </div>
  );
}
