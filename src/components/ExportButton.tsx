import { useLatency } from "../context/LatencyContext";

function toCSV(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const header = Object.keys(rows[0]).join(",");
  const body = rows
    .map((r) => Object.values(r).join(","))
    .join("\n");
  return `${header}\n${body}`;
}

export default function ExportButton() {
  const { samplesHistory, selectedPairId } = useLatency();

  const onExport = () => {
    if (!selectedPairId) return alert("Select a pair first");

    const rows = samplesHistory[selectedPairId] || [];
    const csv = toCSV(
      rows.map((r) => ({
        id: r.id,
        from: r.from,
        to: r.to,
        ms: r.ms,
        ts: new Date(r.ts).toISOString(),
      }))
    );

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedPairId}-history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={onExport}
      className="absolute bottom-6 right-6 z-40 bg-white/10 text-white px-4 py-2 rounded-md"
    >
      Export CSV
    </button>
  );
}
