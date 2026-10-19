import Link from "next/link";
import { teams } from "@/lib/content";
import Hero from "@/components/Hero";
import Galassia5 from "@/components/Galassia5";
import History from "@/components/History";

export default function Home() {
  return (
    <>
      <Hero />
      <Galassia5 />
      <History />
      <section className="border-t border-line px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">Help build Galassia 5.</h2>
            <p className="mt-2 text-muted">We&apos;re recruiting NUS students across {teams.length} sub-teams.</p>
          </div>
          <Link href="/join" className="rounded-full bg-ink px-6 py-3 font-medium text-void transition hover:bg-flare">
            See open roles
          </Link>
        </div>
      </section>
    </>
  );
}
