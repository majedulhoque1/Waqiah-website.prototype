import { Compass } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-dvh place-items-center px-4 pt-20">
      <div className="max-w-md text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft/40 text-primary">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-6xl font-extrabold text-navy">404</p>
        <h1 className="mt-2 text-2xl font-bold text-navy">This page wandered off the map</h1>
        <p className="mt-3 text-muted">
          The page you're looking for doesn't exist or has moved. Let's get you back on course.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="md">
            Back to home
          </Button>
          <Button to="/contact" variant="secondary" size="md">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
