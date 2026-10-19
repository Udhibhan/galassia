"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/#mission", label: "Galassia 5" },
  { href: "/#history", label: "History" },
  { href: "/team", label: "Team" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt="" width={28} height={28} />
          <span className="font-display text-sm font-semibold tracking-[0.25em]">GALASSIA</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition hover:text-ink ${path === l.href ? "text-ink" : "text-muted"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/join"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              path === "/join" ? "bg-flare text-void" : "bg-ink text-void hover:bg-flare"
            }`}
          >
            Join us
          </Link>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-line px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-2 py-3 text-ink/90">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
