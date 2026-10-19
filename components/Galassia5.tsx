import { conops, objectives, specs } from "@/lib/content";
import Placeholder from "./Placeholder";
import { Reveal } from "./Reveal";

export default function Galassia5() {
  return (
    <section id="mission" className="scroll-mt-16 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow mb-4">Galassia 5</p>
          <h2 className="h-section">A technology demonstrator for AI in orbit.</h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {objectives.map((o) => (
            <Reveal key={o.k} className="rounded-2xl border border-line bg-panel/60 p-6">
              <div className="mb-4 font-mono text-xs text-flare">{o.k}</div>
              <h3 className="mb-2 font-display text-xl font-medium">{o.title}</h3>
              <p className="text-muted">{o.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Placeholder
            label="Galassia 5 render or flight hardware, or a concept-of-operations diagram (ship, satellite, downlink)"
            className="aspect-video"
          />
          <div>
            <h3 className="mb-5 font-display text-2xl font-medium">How it works at sea</h3>
            <ol className="space-y-4">
              {conops.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-sm text-flare">{i + 1}</span>
                  <span className="text-ink/85">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
          {specs.map((s) => (
            <div key={s.title}>
              <dt className="eyebrow mb-1">{s.title}</dt>
              <dd className="font-display text-lg">{s.value}</dd>
              <dd className="text-sm text-muted">{s.lines.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
