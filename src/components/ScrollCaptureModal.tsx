import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { AppleEmoji } from "@/components/AppleEmoji";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { useConversion } from "@/lib/conversion-context";

const STORAGE_KEY = "aifune-scroll-capture-dismissed";
const MIN_TIME_ON_PAGE_MS = 60_000;

function isDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dismissed";
  } catch {
    return false;
  }
}

export function ScrollCaptureModal() {
  const { converted } = useConversion();
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);
  const pageReady = useRef(false);

  function dismiss() {
    triggered.current = true;
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Private browsing — hide for this session only
    }
    setOpen(false);
  }

  useEffect(() => {
    if (converted || isDismissed()) return;

    const readyTimer = window.setTimeout(() => {
      pageReady.current = true;
    }, MIN_TIME_ON_PAGE_MS);

    const canTrigger = () =>
      pageReady.current && !triggered.current && !converted && !isDismissed();

    const onScroll = () => {
      if (!canTrigger()) return;
      const doc = document.documentElement;
      const scrolled =
        doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      if (scrolled > 0.72) {
        triggered.current = true;
        setOpen(true);
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (!canTrigger()) return;
      if (e.clientY <= 0) {
        triggered.current = true;
        setOpen(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [converted]);

  useEffect(() => {
    if (converted) setOpen(false);
  }, [converted]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))]"
      onClick={dismiss}
    >
      <div
        role="dialog"
        aria-labelledby="capture-title"
        aria-modal="true"
        className="relative my-auto w-full max-w-md max-h-[min(85dvh,calc(100dvh-2rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px)))] overflow-y-auto rounded-2xl bg-background p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-foreground/8 hover:text-foreground"
          aria-label="Zavrieť"
        >
          <X className="size-5" />
        </button>
        <h2 id="capture-title" className="flex items-center gap-2 pr-8 text-lg font-bold">
          Počkaj! <AppleEmoji name="raised-hand" size={22} />
        </h2>
        <p className="mt-2 text-sm text-muted">
          Video je zadarmo, nič neriskuješ. Zadaj email a pozri si ho, keď
          budeš mať čas.
        </p>
        <div className="mt-4">
          <EmailCaptureForm compact />
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="mt-3 min-h-11 w-full text-center text-xs text-muted hover:text-foreground"
        >
          Možno neskôr
        </button>
      </div>
    </div>
  );
}
