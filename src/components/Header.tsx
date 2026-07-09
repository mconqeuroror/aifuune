import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppleEmoji } from "@/components/AppleEmoji";
import { Badge } from "@/components/ui/badge";
import { IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";

type HeaderProps = {
  olympicsActive?: boolean;
};

export function Header({ olympicsActive = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const olympicsBadge = (
    <Badge
      className={cn(
        "gap-1.5 px-3 py-1.5 text-xs sm:text-sm",
        olympicsActive
          ? "border-amber-200/50 bg-amber-50/80 text-amber-800"
          : "cursor-pointer hover:bg-accent/15 transition-colors",
      )}
    >
      <AppleEmoji name="trophy" size={16} />
      Fune Olympics
    </Badge>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 overflow-hidden transition-all duration-300",
        scrolled ? "glass-header-scrolled rounded-b-2xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <img
            src={IMAGES.logo}
            alt="AI Fuňe"
            className="h-8 w-auto sm:h-10"
          />
        </Link>
        {olympicsActive ? olympicsBadge : <Link to="/olympics">{olympicsBadge}</Link>}
      </div>
      {scrolled && (
        <div
          className={cn(
            "h-px",
            olympicsActive
              ? "bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"
              : "bg-black/6",
          )}
        />
      )}
    </header>
  );
}
