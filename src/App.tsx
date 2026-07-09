import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LanderPage from "@/pages/LanderPage";
import OlympicsPage from "@/pages/OlympicsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanderPage />} />
        <Route path="/olympics" element={<OlympicsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
