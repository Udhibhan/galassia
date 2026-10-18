"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { specs } from "@/lib/content";
import { MaskLines, Reveal } from "./Reveal";

function SpecCard({ spec, i }: { spec: (typeof specs)[number]; i: number }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const bg = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(255,122,26,0.14), transparent 70%)`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delay: (i % 3) * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-panel/70 p-6 transition-colors hover:border-white/15"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative">
        <div className="eyebrow mb-6 flex items-center justify-between">
          <span>{spec.title}</span>
          <span className="text-muted/40">{String(i + 1).padStart(2, "0")}</span>
        </div>
        <div className="mb-4 font-display text-3xl font-medium tracking-tight">{spec.value}</div>
        <ul className="space-y-1 text-sm text-muted">
          {spec.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Specs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  return (
    <section id="specs" className="relative px-4 py-32 sm:px-6 md:py-48">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid items-end gap-10 md:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">05 — Technical specifications</p>
            </Reveal>
            <h2 className="h-section">
              <MaskLines lines={["9 kg of", <span key="b" className="text-muted">engineering.</span>]} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted md:text-right">
              Comprehensive system specifications for Galassia 5, from the bus to the brain.
            </p>
          </Reveal>
        </div>

        <div
          ref={ref}
          style={{ perspective: 1400 }}
          className="relative mb-20"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            px.set((e.clientX - r.left) / r.width - 0.5);
            py.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            px.set(0);
            py.set(0);
          }}
        >
          <motion.div style={{ rotateY: rotY, y }} className="relative">
            <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative mx-auto aspect-[1920/1437] max-w-4xl">
              <Image
                src="/images/internals.png"
                alt="Galassia 5 internal components, CAD cutaway"
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s, i) => (
            <SpecCard key={s.title} spec={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
