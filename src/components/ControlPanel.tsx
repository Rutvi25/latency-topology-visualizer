// src/components/ControlPanel.tsx
import React from "react";
import { useLatency } from "../context/LatencyContext";
import Legend from "./Legend";

export default function ControlPanel() {
  const { filters, setFilters, toggleProvider, selectedPairId, setSelectedPairId } = useLatency();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setFilters({ search: e.target.value });

  return (
    <div className="absolute top-6 left-6 w-80 z-40">
      <div className="bg-black/70 p-4 rounded-md text-white shadow-lg">
        <h3 className="text-lg font-bold">Controls</h3>

        <div className="mt-3">
          <input
            className="w-full p-2 rounded bg-white/5 text-white placeholder-white/60"
            placeholder="Search exchange or region..."
            onChange={handleSearch}
            value={filters.search}
          />
        </div>

        <div className="mt-3">
          <label className="flex items-center justify-between">
            <span>Realtime</span>
            <input
              type="checkbox"
              checked={filters.showRealtime}
              onChange={(e) => setFilters({ showRealtime: e.target.checked })}
            />
          </label>
          <label className="flex items-center justify-between mt-1">
            <span>Historical</span>
            <input
              type="checkbox"
              checked={filters.showHistorical}
              onChange={(e) => setFilters({ showHistorical: e.target.checked })}
            />
          </label>
          <label className="flex items-center justify-between mt-1">
            <span>Regions</span>
            <input type="checkbox" checked={filters.showRegions} onChange={(e) => setFilters({ showRegions: e.target.checked })} />
          </label>
        </div>

        <div className="mt-3">
          <label className="text-sm">Select pair</label>
          <select className="w-full mt-1 bg-white/5 p-2 rounded" value={selectedPairId} onChange={(e) => setSelectedPairId(e.target.value)}>
            {/* build options from window (use global PAIRS from data) */}
            <option value="">-- select pair --</option>
            <option value="binance-okx">Binance ↔ OKX</option>
            <option value="binance-bybit">Binance ↔ Bybit</option>
            <option value="okx-deribit">OKX ↔ Deribit</option>
            <option value="bybit-deribit">Bybit ↔ Deribit</option>
          </select>
        </div>

        <div className="mt-3">
          <Legend onToggle={toggleProvider} active={filters.providers} />
        </div>
      </div>
    </div>
  );
}
