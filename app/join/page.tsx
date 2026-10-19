import type { Metadata } from "next";
import Image from "next/image";
import ApplyForm from "@/components/ApplyForm";
import { MaskLines, Reveal } from "@/components/Reveal";
import { teams } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join us",
  description: "Galassia 5 is recruiting NUS students. No space experience needed.",
};

export default function JoinPage() {
  return (
    <div className="pb-20">
      <div className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 md:pb-16 md:pt-36">
        <Image
          src="/images/hero-orbit.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_30%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-void" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-4">Recruitment</p>
          </Reveal>
          <h1 className="h-section max-w-3xl">
            <MaskLines lines={["Help us build", <span key="b" className="text-muted">a satellite.</span>]} />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-lg text-ink/80">
              No space experience needed. If you&apos;re an NUS student who wants to put real hardware and real code
              into orbit, there&apos;s a seat for you on Galassia 5.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="mb-4 font-display text-2xl font-medium">Sub-teams</h2>
            <ul className="divide-y divide-line border-y border-line">
              {teams.map((t, i) => (
                <li key={t.id} className="py-4">
                  <Reveal delay={i * 0.05} y={12}>
                    <h3 className="font-medium">{t.name}</h3>
                    <p className="mt-1 text-sm text-muted">{t.blurb}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <ApplyForm />
        </div>
      </div>
    </div>
  );
}
