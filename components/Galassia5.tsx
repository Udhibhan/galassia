"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { conops, objectives, specs } from "@/lib/content";
import Placeholder from "./Placeholder";
import { MaskLines, Reveal } from "./Reveal";

export default function Galassia5() {
  const cad = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cad, offset: ["start end", "end start"] });
  const cadY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="mission" className="scroll-mt-16 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">Galassia 5 · Technology demonstrator</p>
          </Reveal>
          <h2 className="h-section">
            <MaskLines lines={["The most advanced Galassia yet.", <span key="b" className="text-muted">AI, in orbit.</span>]} />
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {objectives.map((o, i) => (
            <Reveal key={o.k} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-panel/60 p-6 transition-colors hover:border-white/20">
                <div className="mb-4 font-mono text-xs text-flare">{o.k}</div>
                <h3 className="mb-2 font-display text-xl font-medium">{o.title}</h3>
                <p className="text-muted">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Placeholder
              label="Concept-of-operations diagram: ship tasks the satellite, AI detects vessels, Ku-band downlink"
              className="aspect-video"
            />
          </Reveal>
          <div>
            <Reveal>
              <h3 className="mb-5 font-display text-2xl font-medium">How it works at sea</h3>
            </Reveal>
            <ol className="space-y-4">
              {conops.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4"
                >
                  <span className="font-mono text-sm text-flare">{i + 1}</span>
                  <span className="text-ink/85">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_1.1fr]">
          <motion.div ref={cad} style={{ y: cadY }} className="relative aspect-[1400/1048]">
            <Image
              src="/images/internals.png"
              alt="Galassia 5 internal components, CAD cutaway"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
          <div>
            <Reveal>
              <h3 className="mb-6 font-display text-2xl font-medium">9 kg of engineering</h3>
            </Reveal>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              {specs.map((s, i) => (
                <Reveal key={s.title} delay={(i % 2) * 0.08}>
                  <dt className="eyebrow mb-1">{s.title}</dt>
                  <dd className="font-display text-lg">{s.value}</dd>
                  <dd className="text-sm text-muted">{s.lines.join(" · ")}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
