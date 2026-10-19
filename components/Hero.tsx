"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Orbit from "./Orbit";

const ease = [0.22, 1, 0.36, 1] as const;
const title = "Galassia 5".split("");

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease },
});

export default function Hero() {
  return (
    <section id="top" className="relative px-4 pb-8 pt-28 sm:px-6 md:pb-12 md:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <motion.p {...fadeUp(0.1)} className="eyebrow mb-5">
            CubeSat programme · National University of Singapore
          </motion.p>
          <h1
            aria-label="Galassia 5"
            className="flex font-display text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          >
            {title.map((c, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 1, ease }}
                >
                  {c === " " ? " " : c}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...fadeUp(0.7)} className="mt-6 max-w-lg text-lg text-ink/80 sm:text-xl">
            Teaching a satellite to see. An AI brain in low Earth orbit.
          </motion.p>
          <motion.p
            {...fadeUp(0.85)}
            className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-flare" />
            In development
          </motion.p>
          <motion.div {...fadeUp(1)} className="mt-8 flex flex-wrap gap-3">
            <Link href="/#mission" className="rounded-full bg-ink px-6 py-3 font-medium text-void transition hover:bg-flare">
              The mission
            </Link>
            <Link href="/join" className="rounded-full border border-line px-6 py-3 font-medium transition hover:border-white/30">
              We&apos;re recruiting
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.4, ease }}
        >
          <Orbit className="mx-auto w-full max-w-[620px]" />
        </motion.div>
      </div>
    </section>
  );
}
