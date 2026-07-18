import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "aifune-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== "accepted");
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Private browsing — hide for this session only
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label="Súhlas s cookies"
          className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-[55] sm:inset-x-auto sm:right-4 sm:max-w-[15.5rem]"
        >
          <div className="flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-[#0c0a12]/95 px-2.5 py-2 shadow-lg shadow-black/50 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2">
            <p className="text-[10px] leading-snug text-zinc-300/90 sm:text-[11px]">
              Používame cookies na fungovanie stránky a analytiku.{" "}
              <Link
                to="/cookies"
                className="font-medium text-violet-300 underline-offset-2 hover:underline"
              >
                Viac info
              </Link>
            </p>
            <Button
              onClick={accept}
              className="h-6 shrink-0 rounded-lg px-2.5 text-[10px] [--color-accent:#8b5cf6] sm:h-7 sm:px-3 sm:text-[11px]"
            >
              Súhlasím
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
