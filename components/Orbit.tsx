"use client";

import { useEffect, useRef } from "react";

// Earth with a CubeSat on an inclined orbit around it. The far half of the orbit passes
// behind the planet, so the satellite is masked by the Earth's disc while it's back there.
const C = 200; // viewBox centre
const EARTH_R = 100;
const A = 172; // orbit semi-major axis
const B = 58; // orbit semi-minor axis (how "open" the orbit looks)
const TILT = -16; // degrees
const PERIOD = 16000; // ms per orbit

const rad = (TILT * Math.PI) / 180;
const cos = Math.cos(rad);
const sin = Math.sin(rad);

function point(theta: number) {
  const x = A * Math.cos(theta);
  const y = B * Math.sin(theta);
  return { x: C + x * cos - y * sin, y: C + x * sin + y * cos };
}

// Half of the orbit ellipse as a path: front = lower half (closer to the viewer), back = upper half.
function halfPath(front: boolean) {
  const pts = Array.from({ length: 65 }, (_, i) => point(front ? (i / 64) * Math.PI : Math.PI + (i / 64) * Math.PI));
  return pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

export default function Orbit({ className = "" }: { className?: string }) {
  const sat = useRef<SVGGElement>(null);
  const holder = useRef<SVGGElement>(null);

  useEffect(() => {
    const place = (theta: number) => {
      const { x, y } = point(theta);
      const depth = Math.sin(theta); // >0 in front of Earth, <0 behind
      const scale = 1.5 + 0.35 * depth;
      sat.current?.setAttribute("transform", `translate(${x} ${y}) rotate(${TILT}) scale(${scale})`);
      if (depth < 0) holder.current?.setAttribute("mask", "url(#behind-earth)");
      else holder.current?.removeAttribute("mask");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(Math.PI * 0.3);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      place(((t - start) / PERIOD) * Math.PI * 2 + Math.PI * 0.3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg viewBox="0 40 400 320" className={className} role="img" aria-label="Galassia 5 orbiting the Earth">
      <defs>
        <clipPath id="earth-clip">
          <circle cx={C} cy={C} r={EARTH_R} />
        </clipPath>
        <radialGradient id="earth-shade" cx="0.32" cy="0.3" r="0.85">
          <stop offset="0.45" stopColor="#05060a" stopOpacity="0" />
          <stop offset="1" stopColor="#05060a" stopOpacity="0.85" />
        </radialGradient>
        <radialGradient id="atmosphere" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.82" stopColor="#4cc9ff" stopOpacity="0" />
          <stop offset="0.9" stopColor="#4cc9ff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#4cc9ff" stopOpacity="0" />
        </radialGradient>
        <mask id="behind-earth" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
          <rect width="400" height="400" fill="white" />
          <circle cx={C} cy={C} r={EARTH_R + 1} fill="black" />
        </mask>
      </defs>

      <path d={halfPath(false)} fill="none" stroke="rgba(233,236,245,0.2)" strokeWidth="1" strokeDasharray="2 4" />

      <circle cx={C} cy={C} r={EARTH_R * 1.12} fill="url(#atmosphere)" />
      <image
        href="/images/earth.jpg"
        x={C - EARTH_R * 1.13}
        y={C - EARTH_R * 1.13}
        width={EARTH_R * 2.26}
        height={EARTH_R * 2.26}
        clipPath="url(#earth-clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      <circle cx={C} cy={C} r={EARTH_R} fill="url(#earth-shade)" />

      <path d={halfPath(true)} fill="none" stroke="rgba(233,236,245,0.4)" strokeWidth="1" />

      <g ref={holder}>
        <g ref={sat}>
          {/* 6U bus with two deployed solar panels */}
          <rect x="-15" y="-3" width="10" height="6" rx="0.5" fill="#1e3a6e" stroke="#7fa3d9" strokeWidth="0.4" />
          <rect x="5" y="-3" width="10" height="6" rx="0.5" fill="#1e3a6e" stroke="#7fa3d9" strokeWidth="0.4" />
          <rect x="-5" y="-4" width="10" height="8" rx="1" fill="#e9ecf5" />
          <circle r="1.4" fill="#ff7a1a" />
        </g>
      </g>
    </svg>
  );
}
