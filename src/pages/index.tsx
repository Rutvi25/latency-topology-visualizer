// src/pages/index.tsx
import dynamic from "next/dynamic";
import ControlPanel from "../components/ControlPanel";
import DashboardStatus from "../components/DashboardStatus";
import ExportButton from "../components/ExportButton";
import TimeSeriesChart from "../components/TimeSeriesChart";

const Globe = dynamic(() => import("../components/Globe"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <header className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-white font-bold text-xl">Latency Topology Visualizer (Demo)</h1>
        <div className="text-white/70 text-sm">Dummy data • Simulated realtime</div>
      </header>

      <main className="px-6 pb-12">
        <ControlPanel />
        <div className="mt-8">
          <Globe />
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-white font-medium mb-2">Historical Latency</h3>
            <TimeSeriesChart />
          </div>
          <div>
            <h3 className="text-white font-medium mb-2">Status & Controls</h3>
            <DashboardStatus />
          </div>
        </div>
      </main>

      <ExportButton />
    </div>
  );
}
