import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAdmin } from "../../admin/store";

/** Guards the /admin/* area — redirects to the sign-in screen when not authed. */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAuthed } = useAdmin();
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
