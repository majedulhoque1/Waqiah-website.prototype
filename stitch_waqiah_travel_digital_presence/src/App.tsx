import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Flights from "./pages/Flights";
import Visa from "./pages/Visa";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PlanWithAI from "./pages/PlanWithAI";
import NotFound from "./pages/NotFound";

/** Restore scroll to top on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          {/* Keep old pilgrimage URL working */}
          <Route path="/hajj-umrah" element={<Navigate to="/packages" replace />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-with-ai" element={<PlanWithAI />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
