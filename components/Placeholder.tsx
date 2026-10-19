// Stand-in for a photo we don't have yet. `label` says what the photo should show.
export default function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center ${className}`}
    >
      <div>
        <p className="eyebrow mb-2">Photo</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
