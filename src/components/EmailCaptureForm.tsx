import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { AppleEmoji } from "@/components/AppleEmoji";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CONSENT_TEXT,
  CTA_LABEL,
  CTA_LABEL_HOVER,
  DISCORD_INVITE_URL,
  FORM_ERRORS,
  FORM_ERROR_ICONS,
  LEGAL_FINE_PRINT,
} from "@/lib/content";
import { useConversion } from "@/lib/conversion-context";
import { cn } from "@/lib/utils";

type EmailCaptureFormProps = {
  className?: string;
  compact?: boolean;
  inputPlaceholder?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function EmailCaptureForm({
  className,
  compact = false,
  inputPlaceholder = "tvoj@email.sk",
}: EmailCaptureFormProps) {
  const { markConverted } = useConversion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (!email.trim()) {
      setError(FORM_ERRORS.empty);
      return;
    }
    if (!isValidEmail(email)) {
      setError(FORM_ERRORS.invalid);
      return;
    }

    setError(null);
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      markConverted();
    } catch {
      setError(FORM_ERRORS.network);
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "glass rounded-2xl text-left",
          compact ? "p-3" : "p-4 sm:p-5",
          className,
        )}
      >
        <p className="flex items-center gap-2 text-lg font-bold">
          Hotovo! <AppleEmoji name="party" size={24} />
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Video ti príde na email do pár minút. Nezabudni skontrolovať aj
          spam/promócie.
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          Kým čakáš, pridaj sa aj do našej komunity
          <AppleEmoji name="point-down" size={18} />
        </p>
        <Button asChild className="mt-3 w-full sm:w-auto" size="lg">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pridaj sa na Discord
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "glass rounded-2xl",
        compact ? "p-3" : "p-4 sm:p-5",
        className,
      )}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <div className="sm:flex-1">
            <Input
              type="email"
              placeholder={inputPlaceholder}
              aria-label="Tvoj email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              disabled={status === "loading"}
              aria-invalid={!!error}
              className={cn(error && "border-red-400/60 focus-visible:ring-red-300/40")}
            />
            {error && (
              <p className="mt-1.5 flex items-center gap-1.5 text-left text-xs text-red-500">
                {FORM_ERROR_ICONS.empty && error === FORM_ERRORS.empty && (
                  <AppleEmoji name={FORM_ERROR_ICONS.empty} size={16} />
                )}
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group w-full sm:w-auto sm:shrink-0"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Posielam...
              </>
            ) : (
              hovered ? CTA_LABEL_HOVER : CTA_LABEL
            )}
          </Button>
        </div>
        <p className="mt-1.5 text-center text-xs leading-snug text-muted/70 sm:text-left">
          {CONSENT_TEXT}
        </p>
        <p className="sr-only">{LEGAL_FINE_PRINT}</p>
      </form>
    </div>
  );
}
