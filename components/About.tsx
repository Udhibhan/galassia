"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { MaskLines, Reveal } from "./Reveal";

const paragraph =
  "Developed by leading minds at NUS, Galassia stands as a testament to Singapore's commitment to space exploration. With a focus on Earth observation, Galassia utilizes state-of-the-art technology to monitor our planet's environment and beyond.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const stats = [
  { n: 2, s: "", label: "Satellites launched" },
  { n: 550, s: " km", label: "Target orbit altitude" },
  { n: 6, s: "U", label: "CubeSat form factor" },
];

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: textP } = useScroll({ target: textRef, offset: ["start 85%", "end 45%"] });

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgP } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const clip = useTransform(imgP, [0, 0.4], ["inset(18% 18% 18% 18% round 32px)", "inset(0% 0% 0% 0% round 24px)"]);
  const imgY = useTransform(imgP, [0, 1], ["-12%", "12%"]);

  const words = paragraph.split(" ");

  return (
    <section id="about" className="relative px-4 py-32 sm:px-6 md:py-48">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-6">01 — About Galassia</p>
        </Reveal>
        <h2 className="h-section mb-16 max-w-4xl">
          <MaskLines lines={["Singapore's student-built", <span key="b" className="text-muted">window to orbit.</span>]} />
        </h2>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p ref={textRef} className="text-2xl leading-snug sm:text-3xl">
              {words.map((w, i) => (
                <Word key={i} progress={textP} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
            </p>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-muted">
                Through rigorous research and collaboration, Galassia represents a significant milestone in
                Singapore&apos;s scientific endeavors.
              </p>
            </Reveal>
          </div>

          <motion.div ref={imgRef} style={{ clipPath: clip }} className="relative aspect-[4/3] overflow-hidden">
            <motion.div style={{ y: imgY }} className="absolute -inset-[12%]">
              <Image
                src="/images/team-cleanroom.jpg"
                alt="The Galassia team assembling a CubeSat in a clean room"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
            <p className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80">
              Integration · Clean room
            </p>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="bg-void p-8">
              <div className="font-display text-6xl font-medium tracking-tight">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 text-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
