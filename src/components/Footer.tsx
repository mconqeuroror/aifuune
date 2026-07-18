import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/content";

const footerLink =
  "inline-flex min-h-11 items-center text-zinc-400 transition-colors duration-200 hover:text-violet-300";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden rounded-t-[2.5rem] bg-[#07050c] px-4 py-14 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] sm:rounded-t-[3rem] sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70rem_24rem_at_50%_-10rem,rgba(109,40,217,0.3),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
      />

      <div className="relative z-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-3">
        <div>
          <img
            src={IMAGES.logo}
            alt="AI Fuňe"
            className="mb-4 h-8 w-auto opacity-90 invert"
          />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-100">
            Informácie
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/obchodne-podmienky" className={footerLink}>
                Obchodné podmienky
              </Link>
            </li>
            <li>
              <Link to="/ochrana-osobnych-udajov" className={footerLink}>
                Ochrana osobných údajov
              </Link>
            </li>
            <li>
              <Link to="/cookies" className={footerLink}>
                Cookies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-100">
            Kontakt
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:jorgebyznys@gmail.com" className={footerLink}>
                jorgebyznys@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+421940216575" className={footerLink}>
                +421 940 216 575
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="relative z-10 mt-10 w-full text-center text-xs text-zinc-400">
        © 2026 RYO GROUP s.r.o. Všetky práva vyhradené.
      </p>
    </footer>
  );
}
