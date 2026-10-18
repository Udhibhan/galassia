"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const word = "GALASSIA".split("");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.35]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const titleSpacing = useTransform(scrollYProgress, [0, 1], ["-0.02em", "0.12em"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fiveScale = useTransform(scrollYProgress, [0, 1], [1, 2.4]);
  const fiveOpacity = useTransform(scrollYProgress, [0, 0.4, 0.9], [0.9, 0.5, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[110svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
        <Image
          src="/images/hero-orbit.jpg"
          alt="Galassia CubeSat in orbit above the Earth at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_40%] opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/30 to-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05060a_85%)]" />

      {/* Giant "5" that zooms past the camera on scroll */}
      <motion.div
        aria-hidden
        style={{ scale: fiveScale, opacity: fiveOpacity }}
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <span className="text-outline font-display text-[60vw] font-bold leading-none md:text-[42vw]">5</span>
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="relative z-10 flex h-[100svh] flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.6, ease }}
          className="mb-8"
        >
          <Image src="/images/logo.png" alt="Galassia logo" width={72} height={72} className="animate-spin-slow" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="eyebrow mb-6"
        >
          A CubeSat program by the National University of Singapore
        </motion.p>

        <motion.h1
          style={{ letterSpacing: titleSpacing }}
          className="flex font-display text-[17vw] font-semibold leading-[0.85] sm:text-[14vw] lg:text-[11rem]"
        >
          {word.map((c, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", rotate: 8 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 1.2, ease }}
              >
                {c}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease }}
          className="mt-8 flex flex-col items-center gap-6"
        >
          <p className="max-w-xl text-balance text-lg text-ink/80 sm:text-xl">
            Teaching a satellite to see. <span className="text-spectrum font-medium">Galassia 5</span> puts
            an AI brain in low Earth orbit.
          </p>
          <div className="glass flex items-center gap-3 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-flare shadow-[0_0_12px_#ff7a1a]" />
            <span className="text-muted">Status</span>
            <span>Pre-launch development</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#galassia-5" className="group rounded-full bg-ink px-6 py-3 font-medium text-void transition hover:bg-flare">
              Explore the mission <span className="inline-block transition group-hover:translate-x-1">→</span>
            </a>
            <a href="#join" className="glass rounded-full px-6 py-3 font-medium transition hover:border-flare/50 hover:text-flare">
              We&apos;re recruiting
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-[12svh] left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-ink/30">
          <motion.div
            className="mt-2 h-2 w-1 rounded-full bg-ink/70"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
