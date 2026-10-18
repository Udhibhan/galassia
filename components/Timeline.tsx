"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { timeline } from "@/lib/content";
import { MaskLines, Reveal } from "./Reveal";

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const { scrollYProgress: lineP } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const line = useSpring(lineP, { stiffness: 100, damping: 30 });

  return (
    <section id="timeline" ref={ref} className="relative overflow-hidden px-4 py-32 sm:px-6 md:py-48">
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[15%] inset-x-0 opacity-25">
        <Image src="/images/launch.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-24 text-center">
          <Reveal>
            <p className="eyebrow mb-6">02 — Mission timeline</p>
          </Reveal>
          <h2 className="h-section">
            <MaskLines lines={["From pioneering concepts", <span key="b" className="text-muted">to AI in space.</span>]} />
          </h2>
        </div>

        <div ref={listRef} className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-line md:left-1/2" />
          <motion.div
            style={{ scaleY: line }}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-flare via-[#ffd23f] to-ion md:left-1/2"
          />

          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            const live = item.status === "in-progress";
            return (
              <div key={item.title} className={`relative mb-16 flex md:mb-24 ${left ? "md:justify-start" : "md:justify-end"}`}>
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-30% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`absolute left-5 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-void md:left-1/2 ${
                    live ? "bg-flare shadow-[0_0_24px_#ff7a1a]" : "bg-ink"
                  }`}
                />
                <motion.article
                  initial={{ opacity: 0, x: left ? -80 : 80, rotate: left ? -3 : 3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className={`glass group ml-12 w-full rounded-3xl p-6 transition-colors hover:border-white/20 md:ml-0 md:w-[44%] md:p-8 ${
                    live ? "border-flare/30" : ""
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                    <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse-dot bg-flare" : "bg-emerald-400"}`} />
                    <span className={live ? "text-flare" : "text-muted"}>{item.tag}</span>
                    <span className="text-muted/50">{live ? "· Now" : "· Complete"}</span>
                  </div>
                  <div className="flex items-start gap-5">
                    {"image" in item && item.image && (
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                        className="relative h-20 w-16 shrink-0"
                      >
                        <Image src={item.image} alt={item.title} fill sizes="64px" className="object-contain transition duration-500 group-hover:scale-110" />
                      </motion.div>
                    )}
                    <div>
                      <h3 className="mb-2 font-display text-2xl font-medium md:text-3xl">{item.title}</h3>
                      <p className="leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
