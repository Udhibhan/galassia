import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import { teams } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join us",
  description: "Galassia 5 is recruiting NUS students. No space experience needed.",
};

export default function JoinPage() {
  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">Recruitment</p>
        <h1 className="h-section max-w-3xl">Help us build a satellite.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          No space experience needed. If you&apos;re an NUS student who wants to put real hardware and real code
          into orbit, there&apos;s a place for you on Galassia 5.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="mb-4 font-display text-2xl font-medium">Sub-teams</h2>
            <ul className="divide-y divide-line border-y border-line">
              {teams.map((t) => (
                <li key={t.id} className="py-4">
                  <h3 className="font-medium">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{t.blurb}</p>
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
