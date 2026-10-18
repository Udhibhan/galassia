"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; depth: number; tw: number; hue: number };

// Fixed full-screen canvas: three parallax depths of twinkling stars plus the odd shooting star.
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0;
    let stars: Star[] = [];
    let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    let mx = 0, my = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 2600);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() < 0.7 ? 0.15 : Math.random() < 0.8 ? 0.4 : 0.8;
        return {
          x: Math.random() * w,
          y: Math.random() * h * 3,
          r: Math.random() * 1.1 + depth * 0.9,
          depth,
          tw: Math.random() * Math.PI * 2,
          hue: Math.random() < 0.15 ? (Math.random() < 0.5 ? 30 : 200) : 0,
        };
      });
    };

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / w - 0.5) * 2;
      my = (e.clientY / h - 0.5) * 2;
    };

    const draw = (t: number) => {
      const sy = window.scrollY;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const span = h * 3;
        let y = (s.y - sy * s.depth - my * 12 * s.depth) % span;
        if (y < 0) y += span;
        if (y > h) continue;
        const x = s.x - mx * 12 * s.depth;
        const a = 0.35 + 0.65 * Math.abs(Math.sin(s.tw + t * 0.0012 * (0.5 + s.depth)));
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hue
          ? `hsla(${s.hue}, 100%, 75%, ${a})`
          : `rgba(233,236,245,${a * (0.4 + s.depth)})`;
        ctx.fill();
      }

      if (!shooting && Math.random() < 0.004) {
        shooting = { x: Math.random() * w, y: Math.random() * h * 0.4, vx: -9 - Math.random() * 6, vy: 4 + Math.random() * 3, life: 1 };
      }
      if (shooting) {
        const s = shooting;
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        g.addColorStop(0, `rgba(255,255,255,${s.life})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.015;
        if (s.life <= 0) shooting = null;
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    if (reduce) draw(0), cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
