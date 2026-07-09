import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppleEmoji } from "@/components/AppleEmoji";
import { Badge } from "@/components/ui/badge";
import { IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 overflow-hidden rounded-b-2xl transition-all duration-300",
        scrolled ? "glass-header-scrolled" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/">
          <img
            src={IMAGES.logo}
            alt="AI Fuňe"
            className="h-8 w-auto sm:h-10"
          />
        </Link>
        <Link to="/olympics">
          <Badge className="cursor-pointer gap-1.5 px-3 py-1.5 text-xs sm:text-sm hover:bg-accent/15 transition-colors">
            <AppleEmoji name="trophy" size={16} />
            Fune Olympics
          </Badge>
        </Link>
      </div>
      <div className="h-px bg-black/6" />
    </header>
  );
}
