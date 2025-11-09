import { useLatency } from "../context/LatencyContext";

export default function DashboardStatus() {
  const { samplesRealtime, samplesHistory } = useLatency();
  const last = samplesRealtime[samplesRealtime.length - 1];
  const avgRealtime = samplesRealtime.length ? Math.round(samplesRealtime.reduce((s, x) => s + x.ms, 0) / samplesRealtime.length) : 0;

  const totalHistorical = Object.values(samplesHistory).reduce((s, arr) => s + arr.length, 0);

  return (
    <div className="absolute bottom-6 left-6 z-40 bg-black/60 p-3 rounded-md text-white">
      <div>Realtime samples: {samplesRealtime.length}</div>
      <div>Avg latency (realtime): {avgRealtime} ms</div>
      <div>Historical points: {totalHistorical}</div>
      <div>Last sample: {last ? `${last.from}→${last.to} ${last.ms}ms` : "—"}</div>
    </div>
  );
}
