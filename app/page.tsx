import Image from "next/image";
import Link from "next/link";
import { teams } from "@/lib/content";
import Hero from "@/components/Hero";
import Galassia5 from "@/components/Galassia5";
import History from "@/components/History";
import { MaskLines, Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Galassia5 />
      <History />
      <section className="relative overflow-hidden border-t border-line px-4 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-y-0 right-0 w-full opacity-40 md:w-1/2">
          <Image src="/images/launch.jpg" alt="" fill sizes="50vw" className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-void/20" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            <MaskLines lines={["Help us build", <span key="b" className="text-muted">the next one.</span>]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-md text-muted">
              We&apos;re recruiting NUS students across {teams.length} sub-teams. No space experience needed.
            </p>
            <Link
              href="/join"
              className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-medium text-void transition hover:bg-flare"
            >
              See open roles
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
