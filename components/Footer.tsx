import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row">
        <div className="max-w-sm">
          <div className="mb-4 flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={28} height={28} />
            <span className="font-display text-sm font-semibold tracking-[0.25em]">GALASSIA</span>
          </div>
          <p className="text-sm text-muted">
            A student CubeSat programme at the National University of Singapore.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div className="space-y-2">
            <p className="eyebrow mb-3">Mission</p>
            <Link href="/#mission" className="block text-muted hover:text-ink">Galassia 5</Link>
            <Link href="/#history" className="block text-muted hover:text-ink">History</Link>
          </div>
          <div className="space-y-2">
            <p className="eyebrow mb-3">People</p>
            <Link href="/team" className="block text-muted hover:text-ink">Team</Link>
            <Link href="/join" className="block text-muted hover:text-ink">Join us</Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted">
        © {new Date().getFullYear()} National University of Singapore. All rights reserved.
      </p>
    </footer>
  );
}
