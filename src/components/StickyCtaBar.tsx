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
    <div className="glass-header-scrolled safe-bottom fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-black/6 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="text-center text-xs font-medium text-foreground/85 sm:text-left sm:text-sm">
          Ešte si si nepozrel video?
        </p>
        <Button
          size="lg"
          onClick={scrollToHero}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-full whitespace-normal sm:w-auto sm:shrink-0 sm:whitespace-nowrap"
        >
          {hovered ? `${STICKY_CTA_LABEL} →` : STICKY_CTA_LABEL}
        </Button>
      </div>
    </div>
  );
}
