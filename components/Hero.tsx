import Link from "next/link";
import Orbit from "./Orbit";

export default function Hero() {
  return (
    <section id="top" className="relative px-4 pb-8 pt-28 sm:px-6 md:pb-12 md:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow mb-5">CubeSat programme · National University of Singapore</p>
          <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Galassia 5
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink/80 sm:text-xl">
            A 6U CubeSat that runs AI on board: it spots ships from orbit and sends what it finds straight down to
            them over Ku-band.
          </p>
          <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-flare" />
            In development
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#mission" className="rounded-full bg-ink px-6 py-3 font-medium text-void transition hover:bg-flare">
              The mission
            </Link>
            <Link href="/join" className="rounded-full border border-line px-6 py-3 font-medium transition hover:border-white/30">
              We&apos;re recruiting
            </Link>
          </div>
        </div>
        <Orbit className="mx-auto w-full max-w-[600px]" />
      </div>
    </section>
  );
}
