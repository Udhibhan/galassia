"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { conops } from "@/lib/content";
import { MaskLines, Reveal } from "./Reveal";

export default function ConOps() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const earthY = useTransform(scrollYProgress, [0, 1], ["30%", "-10%"]);
  const earthRotate = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const tilt = useTransform(scrollYProgress, [0.1, 0.45], [18, 0]);
  const imgScale = useTransform(scrollYProgress, [0.1, 0.45], [0.85, 1]);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="conops" ref={ref} className="relative overflow-hidden px-4 py-32 sm:px-6 md:py-48">
      {/* Earth rising from below */}
      <motion.div
        aria-hidden
        style={{ y: earthY, rotate: earthRotate }}
        className="pointer-events-none absolute left-1/2 top-[55%] aspect-square w-[150vw] max-w-[1600px] -translate-x-1/2 opacity-40 md:w-[110vw]"
      >
        <Image src="/images/earth.jpg" alt="" fill sizes="110vw" className="rounded-full object-cover" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_40px_#05060a,0_0_120px_10px_rgba(76,201,255,0.25)]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/60 to-void" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6">04 — Concept of operations</p>
          </Reveal>
          <h2 className="h-section">
            <MaskLines lines={["Spot every ship.", <span key="b" className="text-muted">From 550 km up.</span>]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted">How Galassia 5 operates in real-world maritime scenarios.</p>
          </Reveal>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div style={{ perspective: 1200 }}>
            <motion.div
              style={{ rotateX: tilt, scale: imgScale }}
              className="relative aspect-video overflow-hidden rounded-3xl border border-line"
            >
              <Image
                src="/images/conops.jpg"
                alt="Galassia 5 concept of operations: tasking, imaging, AI detection and Ku-band downlink to a vessel"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 h-24 animate-scan bg-gradient-to-b from-transparent via-ion/20 to-transparent mix-blend-screen" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-red-500" /> Live sim
              </div>
            </motion.div>
          </div>

          <ol className="space-y-3">
            {conops.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`glass flex cursor-default gap-4 rounded-2xl p-5 transition-all duration-300 ${
                  hover === i ? "translate-x-2 border-flare/40 bg-white/[0.06]" : ""
                } ${hover !== null && hover !== i ? "opacity-50" : ""}`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-flare/50 font-mono text-sm text-flare">
                  {i + 1}
                </span>
                <span className="pt-1 text-ink/90">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
