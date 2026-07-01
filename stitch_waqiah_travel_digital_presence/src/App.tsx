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
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import RequireAdmin from "./components/admin/RequireAdmin";
import AdminShell from "./components/admin/AdminShell";
import Dashboard from "./pages/admin/Dashboard";
import AdminPackages from "./pages/admin/Packages";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminVisa from "./pages/admin/Visa";
import AdminFlights from "./pages/admin/Flights";
import AdminChatHistory from "./pages/admin/ChatHistory";
import AdminCMS from "./pages/admin/CMS";
import AdminSettings from "./pages/admin/Settings";

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
        {/* Standalone admin sign-in (no site chrome) */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin console — guarded, own shell (sidebar + top bar) */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminShell />
            </RequireAdmin>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="visa" element={<AdminVisa />} />
          <Route path="flights" element={<AdminFlights />} />
          <Route path="chat" element={<AdminChatHistory />} />
          <Route path="cms" element={<AdminCMS />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
}
