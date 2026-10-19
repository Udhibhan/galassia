import { history } from "@/lib/content";
import Placeholder from "./Placeholder";
import { Reveal } from "./Reveal";

export default function History() {
  return (
    <section id="history" className="scroll-mt-16 border-t border-line px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow mb-4">Our history</p>
          <h2 className="h-section">Two satellites in orbit so far.</h2>
          <p className="mt-4 text-lg text-muted">
            Galassia is built by NUS students. Each mission has taken on harder problems than the one before it.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {history.map((m) => (
            <Reveal key={m.title} className="overflow-hidden rounded-2xl border border-line bg-panel/60">
              <Placeholder label={m.photo} className="aspect-[16/10] rounded-none border-0 border-b" />
              <div className="p-6">
                <p className="eyebrow mb-2">{m.focus}</p>
                <h3 className="mb-3 font-display text-2xl font-medium">{m.title}</h3>
                <p className="text-muted">{m.description}</p>
                <p className="mt-3 text-sm text-ink/70">{m.launch}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
