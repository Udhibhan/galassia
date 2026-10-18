"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { objectives } from "@/lib/content";

// Pinned section: the satellite stays on screen and turns while the three objectives step through.
export default function Galassia5() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(objectives.length - 1, Math.max(0, Math.floor(v * objectives.length * 0.999))));
  });

  const rotate = useTransform(p, [0, 1], [-18, 14]);
  const scale = useTransform(p, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.9]);
  const ringRotate = useTransform(p, [0, 1], [0, 220]);
  const glow = useTransform(p, [0, 0.5, 1], ["#ff7a1a", "#ffd23f", "#4cc9ff"]);
  const bigY = useTransform(p, [0, 1], ["10%", "-30%"]);

  return (
    <section id="galassia-5" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-4 sm:px-6">
        <motion.span
          aria-hidden
          style={{ y: bigY }}
          className="text-outline pointer-events-none absolute -right-[5vw] top-1/2 -translate-y-1/2 select-none font-display text-[38vw] font-bold leading-none"
        >
          G5
        </motion.span>

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-16">
          {/* Satellite */}
          <div className="relative mx-auto aspect-square w-[62vw] max-w-[520px] md:w-full">
            <motion.div
              style={{ background: glow }}
              className="absolute inset-[18%] rounded-full opacity-25 blur-[80px]"
            />
            <motion.svg style={{ rotate: ringRotate }} viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="ring" x1="0" x2="1">
                  <stop offset="0" stopColor="#ff7a1a" />
                  <stop offset="0.5" stopColor="#ffd23f" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#4cc9ff" />
                </linearGradient>
              </defs>
              <ellipse cx="100" cy="100" rx="96" ry="38" fill="none" stroke="url(#ring)" strokeWidth="0.5" transform="rotate(-20 100 100)" />
              <ellipse cx="100" cy="100" rx="90" ry="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" strokeDasharray="1 3" />
              <circle cx="196" cy="100" r="2" fill="#ff7a1a" transform="rotate(-20 100 100)" />
            </motion.svg>
            <motion.div style={{ rotate, scale }} className="absolute inset-[12%]">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src="/images/galassia-5.png"
                  alt="Galassia 5 satellite with deployed solar panels"
                  fill
                  sizes="(min-width: 768px) 40vw, 60vw"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Objectives */}
          <div>
            <p className="eyebrow mb-4">03 — Galassia 5 · Technology demonstrator</p>
            <h2 className="mb-6 font-display text-4xl font-medium leading-[1.02] tracking-tight md:mb-10 md:text-6xl">
              The most advanced <span className="text-spectrum">Galassia</span> yet.
            </h2>

            <div className="mb-6 flex gap-2">
              {objectives.map((o, i) => (
                <div key={o.k} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="h-full bg-spectrum"
                    initial={false}
                    animate={{ width: i <= active ? "100%" : "0%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              ))}
            </div>

            <div className="relative min-h-[170px] md:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-3 font-mono text-sm text-flare">
                    {objectives[active].k} / 0{objectives.length}
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-medium md:text-4xl">{objectives[active].title}</h3>
                  <p className="max-w-md text-lg text-muted">{objectives[active].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
