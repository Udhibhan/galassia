"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { history, stats } from "@/lib/content";
import { Counter, MaskLines, Reveal, ScrollWords } from "./Reveal";

const intro =
  "Developed by leading minds at NUS, Galassia stands as a testament to Singapore's commitment to space exploration. With a focus on Earth observation, Galassia utilizes state-of-the-art technology to monitor our planet's environment and beyond.";

export default function History() {
  const photo = useRef<HTMLDivElement>(null);
  const { scrollYProgress: photoP } = useScroll({ target: photo, offset: ["start end", "center center"] });
  const photoScale = useTransform(photoP, [0, 1], [1.15, 1]);

  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress: lineP } = useScroll({ target: list, offset: ["start 75%", "end 60%"] });
  const line = useSpring(lineP, { stiffness: 100, damping: 30 });

  return (
    <section id="history" className="scroll-mt-16 border-t border-line px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">Our history</p>
          </Reveal>
          <h2 className="h-section">
            <MaskLines lines={["From pioneering concepts", <span key="b" className="text-muted">to AI in space.</span>]} />
          </h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <ScrollWords text={intro} className="text-2xl leading-snug sm:text-3xl" />
          <div ref={photo} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <motion.div style={{ scale: photoScale }} className="absolute inset-0">
              <Image
                src="/images/team-cleanroom.jpg"
                alt="The Galassia team integrating a CubeSat in a clean room"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 border-y border-line">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className={`py-6 ${i ? "border-l border-line pl-4 sm:pl-8" : ""}`}>
              <div className="font-display text-3xl font-medium tracking-tight sm:text-5xl">
                <Counter to={s.n} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <ol ref={list} className="relative mt-16">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-1/2" />
          <motion.div
            style={{ scaleY: line }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-ink/60 to-flare md:left-1/2"
          />

          {history.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <li key={m.title} className={`relative mb-6 flex last:mb-0 md:mb-0 ${i ? "md:-mt-16" : ""} ${left ? "md:justify-start" : "md:justify-end"}`}>
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-30% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className={`absolute left-4 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-void md:left-1/2 ${
                    m.live ? "bg-flare" : "bg-ink"
                  }`}
                />
                <motion.article
                  initial={{ opacity: 0, x: left ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-10 flex w-full items-center gap-5 rounded-2xl border bg-panel/60 p-5 md:ml-0 md:w-[46%] ${
                    m.live ? "border-flare/30" : "border-line"
                  }`}
                >
                  <div className="relative h-28 w-24 shrink-0">
                    <Image src={m.image} alt={m.title} fill sizes="96px" className="object-contain" />
                  </div>
                  <div>
                    <p className="eyebrow mb-1">{m.focus}</p>
                    <h3 className="mb-1 font-display text-2xl font-medium">{m.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{m.description}</p>
                    <p className={`mt-2 text-xs ${m.live ? "text-flare" : "text-ink/60"}`}>{m.launch}</p>
                  </div>
                </motion.article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
