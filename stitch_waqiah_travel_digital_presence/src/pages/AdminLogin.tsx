import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowLeft, ShieldCheck, AlertCircle, Eye, EyeOff, LogOut, LayoutDashboard } from "lucide-react";
import Logo from "../components/ui/Logo";
import { cn } from "../lib/utils";

// ⚠️ DEMO-ONLY client-side gate. NOT secure — these values ship in the public
// bundle. Replace with real server-side auth (e.g. Supabase) in the backend phase.
const ADMIN_EMAIL = "waqiahtravels@gmail.com";
const ADMIN_PASSWORD = "Waqiah123";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const field =
    "min-h-[48px] w-full rounded-md border bg-surface-container/50 px-3.5 text-[15px] " +
    "outline-none transition focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setError(false);
      setSignedIn(true);
    } else {
      setError(true);
    }
  }

  return (
    <section className="grid min-h-dvh place-items-center bg-surface px-4 py-24">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        {signedIn ? (
          <div className="rounded-xl border border-outline-variant/60 bg-white p-8 text-center shadow-soft">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
              <ShieldCheck className="h-7 w-7" aria-hidden="true" />
            </span>
            <h1 className="mt-4 font-display text-xl font-bold text-navy">Signed in</h1>
            <p className="mt-2 text-muted">
              Welcome back. The full admin dashboard — bookings, packages, inquiries, and CMS — is
              being built in the next phase.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 rounded-md bg-surface-container p-4 text-sm text-muted">
              <LayoutDashboard className="h-5 w-5 text-primary" aria-hidden="true" />
              Dashboard coming soon
            </div>
            <button
              type="button"
              onClick={() => {
                setSignedIn(false);
                setEmail("");
                setPassword("");
              }}
              className="mt-6 inline-flex items-center gap-2 font-display font-bold text-primary hover:text-primary-dark"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-outline-variant/60 bg-white p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h1 className="font-display text-xl font-bold text-navy">Admin Portal</h1>
                <p className="text-sm text-muted">Sign in to manage Waqiah Travel</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <label htmlFor="admin-email" className="mb-1.5 block text-sm font-semibold text-navy">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                  className={cn(field, error ? "border-danger" : "border-outline-variant/70")}
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-navy">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    className={cn(field, "pr-11", error ? "border-danger" : "border-outline-variant/70")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded text-muted hover:text-navy"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="flex items-center gap-1.5 text-sm font-medium text-danger">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  Invalid email or password.
                </p>
              )}

              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-display font-bold text-white shadow-soft transition hover:bg-primary-dark"
              >
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                Sign in
              </button>
            </form>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to website
          </Link>
        </div>
      </div>
    </section>
  );
}
