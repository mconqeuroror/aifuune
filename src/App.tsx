import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { SeoHead } from "@/components/SeoHead";
import LegalPage from "@/pages/LegalPage";
import LanderPage from "@/pages/LanderPage";
import OlympicsPage from "@/pages/OlympicsPage";

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <SeoHead />
        <CookieConsent />
        <Analytics />
        <Routes>
          <Route path="/" element={<LanderPage />} />
          <Route path="/olympics" element={<OlympicsPage />} />
          <Route path="/obchodne-podmienky" element={<LegalPage />} />
          <Route path="/ochrana-osobnych-udajov" element={<LegalPage />} />
          <Route path="/cookies" element={<LegalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MotionConfig>
    </BrowserRouter>
  );
}
