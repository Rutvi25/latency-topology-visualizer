const PROVIDER_COLOR: Record<string, string> = {
  AWS: "#f59e0b",
  GCP: "#ef4444",
  AZURE: "#06b6d4",
  EXCHANGE: "#8b5cf6",
};

export default function Legend({ onToggle, active }: { onToggle: (p: string) => void; active: Set<string> }) {
  const providers = Object.keys(PROVIDER_COLOR);
  return (
    <div className="bg-black/60 text-white p-3 rounded-md shadow-md">
      <h4 className="font-semibold mb-2">Providers</h4>
      <div className="flex gap-2">
        {providers.map((p) => (
          <button
            key={p}
            onClick={() => onToggle(p)}
            className={`flex items-center gap-2 px-3 py-1 rounded ${active.has(p) ? "ring-2 ring-white/60" : "opacity-50"}`}
          >
            <span style={{ width: 12, height: 12, background: PROVIDER_COLOR[p], display: "inline-block", borderRadius: 3 }} />
            <span className="text-sm">{p}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
