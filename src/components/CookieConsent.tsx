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
          className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-[55] sm:inset-x-auto sm:right-4 sm:max-w-sm"
        >
          <div className="rounded-xl border border-black/10 bg-white/95 px-3.5 py-3 shadow-xl shadow-black/10 backdrop-blur-sm">
            <p className="text-xs leading-relaxed text-foreground/85 sm:text-[13px]">
              Používame cookies na fungovanie stránky a analytiku.{" "}
              <Link
                to="/cookies"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                Viac info
              </Link>
            </p>
            <Button onClick={accept} className="mt-2.5 h-9 w-full text-xs sm:text-sm">
              Súhlasím
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
