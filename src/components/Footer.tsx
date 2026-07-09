import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/content";

export function Footer() {
  return (
    <footer className="w-full border-t border-black/6 bg-background px-4 py-12 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] sm:px-6 lg:px-8">
      <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-3">
        <div>
          <img
            src={IMAGES.logo}
            alt="AI Fuňe"
            className="mb-4 h-8 w-auto opacity-80"
          />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Informácie
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link
                to="/obchodne-podmienky"
                className="inline-flex min-h-11 items-center hover:text-accent transition-colors"
              >
                Obchodné podmienky
              </Link>
            </li>
            <li>
              <Link
                to="/ochrana-osobnych-udajov"
                className="inline-flex min-h-11 items-center hover:text-accent transition-colors"
              >
                Ochrana osobných údajov
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="inline-flex min-h-11 items-center hover:text-accent transition-colors"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Kontakt
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a
                href="mailto:jorgebyznys@gmail.com"
                className="inline-flex min-h-11 items-center hover:text-accent transition-colors"
              >
                jorgebyznys@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+421940216575"
                className="inline-flex min-h-11 items-center hover:text-accent transition-colors"
              >
                +421 940 216 575
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-10 w-full text-center text-xs text-muted">
        © 2026 RYO GROUP s.r.o. Všetky práva vyhradené.
      </p>
    </footer>
  );
}
