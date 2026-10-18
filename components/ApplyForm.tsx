"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { teams, years } from "@/lib/content";

const MAX_BYTES = 4 * 1024 * 1024;
const NUS_EMAIL = /^[a-z0-9._%+-]+@(u\.nus\.edu|nus\.edu\.sg)$/i;

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="mb-2 flex items-baseline justify-between text-sm">
      <span className="text-ink/90">{children}</span>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </span>
  );
}

export default function ApplyForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [picked, setPicked] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [why, setWhy] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const takeFile = (f: File | undefined | null) => {
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setState({ kind: "error", message: "Resume must be a PDF." });
      return;
    }
    if (f.size > MAX_BYTES) {
      setState({ kind: "error", message: "Resume must be under 4 MB." });
      return;
    }
    setFile(f);
    if (state.kind === "error") setState({ kind: "idle" });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!NUS_EMAIL.test(email)) return setState({ kind: "error", message: "Please use your NUS email (@u.nus.edu or @nus.edu.sg)." });
    if (picked.length === 0) return setState({ kind: "error", message: "Pick at least one team you're interested in." });
    if (!file) return setState({ kind: "error", message: "Please attach your resume (PDF)." });

    form.delete("teams");
    picked.forEach((t) => form.append("teams", t));
    form.set("resume", file);

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/apply", { method: "POST", body: form });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setState({ kind: "done" });
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <div id="apply" className="relative mx-auto max-w-3xl scroll-mt-24">
      <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
      <div className="relative rounded-[28px] bg-deep/95 p-6 backdrop-blur-xl sm:p-10">
        <AnimatePresence mode="wait">
          {state.kind === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-16 text-center"
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8 grid h-20 w-20 place-items-center rounded-full bg-spectrum p-[2px]"
              >
                <div className="grid h-full w-full place-items-center rounded-full bg-deep text-3xl">🛰️</div>
              </motion.div>
              <h3 className="mb-3 font-display text-3xl font-medium">Application received.</h3>
              <p className="max-w-md text-muted">
                Thanks for applying to Galassia 5. We&apos;ll reach out to your NUS email soon. Clear skies!
              </p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -20 }} className="space-y-6" noValidate>
              <div>
                <h3 className="font-display text-3xl font-medium">Apply to the team</h3>
                <p className="mt-2 text-muted">Takes about three minutes. NUS students only.</p>
              </div>

              {/* Honeypot: hidden from people, tempting to bots */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <Label>Full name</Label>
                  <input name="fullName" required maxLength={120} autoComplete="name" className="field" placeholder="Tan Wei Ling" />
                </label>
                <label className="block">
                  <Label>NUS email</Label>
                  <input name="email" type="email" required autoComplete="email" className="field" placeholder="e0123456@u.nus.edu" />
                </label>
                <label className="block">
                  <Label>Year of study</Label>
                  <select name="year" required defaultValue="" className="field appearance-none">
                    <option value="" disabled>Select…</option>
                    {years.map((y) => (
                      <option key={y} value={y} className="bg-deep">
                        {y}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <Label>Major</Label>
                  <input name="major" required maxLength={120} className="field" placeholder="Electrical Engineering" />
                </label>
              </div>

              <fieldset>
                <Label hint="Pick any">Teams you&apos;re interested in</Label>
                <div className="flex flex-wrap gap-2">
                  {teams.map((t) => {
                    const on = picked.includes(t.id);
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => toggle(t.id)}
                        aria-pressed={on}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          on ? "border-flare bg-flare text-void" : "border-line text-ink/80 hover:border-white/30"
                        }`}
                      >
                        {t.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="block">
                <Label hint={`${why.length}/3000`}>Why do you want to join Galassia 5?</Label>
                <textarea
                  name="why"
                  required
                  minLength={20}
                  maxLength={3000}
                  rows={5}
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  className="field resize-y"
                  placeholder="What excites you about space, what you'd like to build, projects you've done…"
                />
              </label>

              <label className="block">
                <Label hint="Optional">LinkedIn / GitHub / portfolio</Label>
                <input name="links" maxLength={500} className="field" placeholder="https://github.com/…" />
              </label>

              <div>
                <Label hint="PDF · max 4 MB">Resume</Label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInput.current?.click()}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInput.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                  }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDrag(false);
                    takeFile(e.dataTransfer.files?.[0]);
                  }}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition ${
                    drag ? "border-flare bg-flare/10" : file ? "border-emerald-400/50 bg-emerald-400/5" : "border-line hover:border-white/30"
                  }`}
                >
                  {file ? (
                    <>
                      <span className="font-medium text-emerald-300">{file.name}</span>
                      <span className="mt-1 text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB · click to replace</span>
                    </>
                  ) : (
                    <>
                      <span className="text-ink/90">Drop your resume here</span>
                      <span className="mt-1 text-xs text-muted">or click to browse</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInput}
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  onChange={(e) => takeFile(e.target.files?.[0])}
                />
              </div>

              <AnimatePresence>
                {state.kind === "error" && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    {state.message}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={state.kind === "sending"}
                className="group relative w-full overflow-hidden rounded-full bg-ink py-4 font-medium text-void transition hover:bg-flare disabled:opacity-60"
              >
                {state.kind === "sending" ? "Transmitting…" : "Submit application"}
                {state.kind !== "sending" && (
                  <span className="ml-2 inline-block transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                )}
              </button>
              <p className="text-center text-xs text-muted">
                Your details are only used for Galassia recruitment and are stored securely.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
