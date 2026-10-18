"use client";

import { motion } from "framer-motion";
import { teams } from "@/lib/content";
import { MaskLines, Reveal } from "./Reveal";
import ApplyForm from "./ApplyForm";

export default function Join() {
  return (
    <section id="join" className="relative overflow-hidden px-4 py-32 sm:px-6 md:py-48">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-flare/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <Reveal>
            <p className="eyebrow mb-6">06 — We&apos;re recruiting</p>
          </Reveal>
          <h2 className="font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            <MaskLines lines={["Help us build", <span key="b" className="text-spectrum">a satellite.</span>]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted">
              No space experience needed. If you&apos;re an NUS student who wants to put real hardware and real code
              into orbit, there&apos;s a seat for you on Galassia 5.
            </p>
          </Reveal>
        </div>

        <div className="mb-24 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ delay: i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={`glass group relative overflow-hidden rounded-3xl p-6`}
            >
              <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-spectrum transition-transform duration-500 group-hover:scale-x-100" />
              <div className="mb-8 font-mono text-xs text-flare">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mb-2 font-display text-xl font-medium">{t.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{t.blurb}</p>
            </motion.div>
          ))}
          <motion.a
            href="#apply"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: teams.length * 0.07, duration: 0.8 }}
            className="group flex flex-col justify-between rounded-3xl bg-ink p-6 text-void transition hover:bg-flare"
          >
            <span className="font-mono text-xs">→</span>
            <span className="font-display text-2xl font-medium">Apply now</span>
          </motion.a>
        </div>

        <ApplyForm />
      </div>
    </section>
  );
}
