import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useLatency } from "../context/LatencyContext";

export default function TimeSeriesChart() {
  const { samplesHistory, selectedPairId } = useLatency();
  if (!selectedPairId) return <div className="p-4 text-white/70">Select a pair to see history</div>;
  const data = (samplesHistory[selectedPairId] || []).map((s) => ({ timestamp: s.ts, ms: s.ms }));
  return (
    <div className="w-full h-64 bg-black/50 rounded-md p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={(v) => new Date(v).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(v) => new Date(v).toLocaleString()} />
          <Line type="monotone" dataKey="ms" stroke="#60a5fa" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
