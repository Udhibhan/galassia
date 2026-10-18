"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const spacing = useTransform(scrollYProgress, [0, 1], ["0.3em", "-0.02em"]);

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden border-t border-line px-4 pb-6 pt-20 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row">
        <div className="max-w-sm">
          <div className="mb-4 flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={32} height={32} />
            <span className="font-display font-semibold tracking-[0.25em]">GALASSIA</span>
          </div>
          <p className="text-sm text-muted">
            National University of Singapore (NUS). Advancing Singapore&apos;s space exploration capabilities.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="space-y-2">
            <p className="eyebrow mb-3">Mission</p>
            <a href="#about" className="block text-muted hover:text-ink">About</a>
            <a href="#timeline" className="block text-muted hover:text-ink">Timeline</a>
            <a href="#galassia-5" className="block text-muted hover:text-ink">Galassia 5</a>
            <a href="#specs" className="block text-muted hover:text-ink">Specs</a>
          </div>
          <div className="space-y-2">
            <p className="eyebrow mb-3">Team</p>
            <a href="#join" className="block text-muted hover:text-ink">Sub-teams</a>
            <a href="#apply" className="block text-muted hover:text-ink">Apply</a>
            <a href="#top" className="block text-muted hover:text-ink">Back to top ↑</a>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ y, letterSpacing: spacing }}
        className="text-outline mt-16 select-none text-center font-display text-[19vw] font-bold leading-[0.8]"
      >
        GALASSIA
      </motion.div>

      <div className="mx-auto mt-6 flex max-w-6xl flex-col justify-between gap-2 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} National University of Singapore. All rights reserved.</span>
        <span className="font-mono">1.2906° N, 103.7764° E → 550 km SSO</span>
      </div>
    </footer>
  );
}
