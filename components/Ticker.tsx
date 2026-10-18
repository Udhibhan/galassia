"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ticker } from "@/lib/content";

function wrap(min: number, max: number, v: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

// Infinite marquee whose speed, direction and skew react to scroll velocity.
function Row({ base, children }: { base: number; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8]);
  const dir = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    x.set(x.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0" style={{ x: pos, skewX: skew }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default function Ticker() {
  const items = (
    <div className="flex shrink-0 items-center">
      {ticker.map((t) => (
        <span key={t} className="flex items-center font-display text-3xl font-medium uppercase tracking-tight sm:text-5xl">
          <span className="px-6">{t}</span>
          <span className="h-2 w-2 rotate-45 bg-flare" />
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Mission highlights" className="relative -mt-[10svh] border-y border-line bg-void/60 py-6 backdrop-blur-sm">
      <Row base={-2}>{items}</Row>
      <div className="mt-3 opacity-30">
        <Row base={2}>
          <div className="flex shrink-0 items-center">
            {ticker.map((t) => (
              <span key={t} className="text-outline px-6 font-display text-3xl font-medium uppercase sm:text-5xl">
                {t}
              </span>
            ))}
          </div>
        </Row>
      </div>
    </section>
  );
}
