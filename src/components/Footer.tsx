import { IMAGES } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-black/6 bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3">
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
              <a href="#" className="hover:text-accent transition-colors">
                Obchodné podmienky
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Ochrana osobných údajov
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Cookies
              </a>
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
                className="hover:text-accent transition-colors"
              >
                jorgebyznys@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+421940216575"
                className="hover:text-accent transition-colors"
              >
                +421 940 216 575
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-5xl text-center text-xs text-muted">
        © 2026 RYO GROUP s.r.o. Všetky práva vyhradené.
      </p>
    </footer>
  );
}
