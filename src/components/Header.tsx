import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppleEmoji } from "@/components/AppleEmoji";
import { Badge } from "@/components/ui/badge";
import { IMAGES } from "@/lib/content";
import { cn } from "@/lib/utils";

type HeaderProps = {
  olympicsActive?: boolean;
  /** Dark purple glass header (lander + Olympics) */
  darkHeader?: boolean;
  /** @deprecated use darkHeader */
  olympicsDark?: boolean;
};

export function Header({
  olympicsActive = false,
  darkHeader = false,
  olympicsDark = false,
}: HeaderProps) {
  const isDarkHeader = darkHeader || olympicsDark;
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  function handleLogoClick() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

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
          ? isDarkHeader
            ? "badge-gradient-hover border-transparent bg-violet-500/10 text-violet-200"
            : "border-amber-200/50 bg-amber-50/80 text-amber-800"
          : isDarkHeader
            ? "badge-gradient-hover cursor-pointer border-transparent bg-violet-500/10 text-violet-200 hover:text-violet-100"
            : "cursor-pointer hover:bg-accent/15 transition-colors",
      )}
    >
      <AppleEmoji name="trophy" size={16} />
      Fune Olympics
    </Badge>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 overflow-hidden transition-all duration-300 pt-[env(safe-area-inset-top,0px)]",
          scrolled
            ? isDarkHeader
              ? "glass-header-olympics-scrolled rounded-b-[1.75rem]"
              : "glass-header-scrolled rounded-b-[1.75rem]"
            : "bg-transparent",
        )}
      >
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="transition-opacity hover:opacity-80"
          >
            <img
              src={IMAGES.logo}
              alt="AI Fuňe"
              className={cn("h-8 w-auto sm:h-10", isDarkHeader && "invert")}
            />
          </Link>
          {olympicsActive ? olympicsBadge : <Link to="/olympics">{olympicsBadge}</Link>}
        </div>
        {scrolled && (
          <div
            className={cn(
              "h-px",
              olympicsActive || isDarkHeader
                ? "bg-gradient-to-r from-transparent via-violet-400/35 to-transparent"
                : "bg-black/6",
            )}
          />
        )}
      </header>
      <div
        aria-hidden
        className="h-[calc(3.5rem+env(safe-area-inset-top,0px))] shrink-0 sm:h-[calc(4rem+env(safe-area-inset-top,0px))]"
      />
    </>
  );
}
