import type { Metadata } from "next";
import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { leadership, teams } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description: "The NUS students and staff building Galassia 5.",
};

export default function TeamPage() {
  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">Team</p>
        <h1 className="h-section max-w-3xl">The people building Galassia 5.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Undergraduates and postgraduates from across NUS, working with faculty advisors on every part of the
          spacecraft.
        </p>

        <Placeholder label="Group photo of the whole team" className="mt-10 aspect-[21/9]" />

        <h2 className="mb-6 mt-16 font-display text-2xl font-medium">Leadership</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((p) => (
            <div key={p.role} className="flex items-center gap-4 rounded-2xl border border-line bg-panel/60 p-4">
              {/* Headshot placeholder */}
              <div className="h-16 w-16 shrink-0 rounded-full border border-dashed border-white/15 bg-white/[0.02]" />
              <div>
                <p className="font-display text-lg">{p.name}</p>
                <p className="text-sm text-muted">{p.role}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 mt-16 font-display text-2xl font-medium">Sub-teams</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((t) => (
            <div key={t.id} className="overflow-hidden rounded-2xl border border-line bg-panel/60">
              <Placeholder label={`${t.name} team at work`} className="aspect-[16/10] rounded-none border-0 border-b" />
              <div className="p-5">
                <h3 className="mb-1 font-display text-lg font-medium">{t.name}</h3>
                <p className="text-sm text-muted">{t.blurb}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line p-6 sm:flex-row sm:items-center">
          <p className="text-lg">Want to be on this page?</p>
          <Link href="/join" className="rounded-full bg-ink px-6 py-3 font-medium text-void transition hover:bg-flare">
            Join the team
          </Link>
        </div>
      </div>
    </div>
  );
}
