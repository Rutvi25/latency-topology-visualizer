// src/context/LatencyContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  EXCHANGES,
  PAIRS,
  generateHistory,
  LatencySample,
  Exchange,
  Region,
} from "../data/dummyData";

export type Filters = {
  providers: Set<string>;
  search: string;
  latencyRange: [number, number];
  showRegions: boolean;
  showRealtime: boolean;
  showHistorical: boolean;
};

export type LatencyState = {
  exchanges: Exchange[];
  regions: Region[] | null;
  samplesRealtime: LatencySample[]; // last N real-time samples
  samplesHistory: Record<string, LatencySample[]>; // per pair id
  filters: Filters;
  selectedPairId?: string;
  setFilters: (f: Partial<Filters>) => void;
  setSelectedPairId: (id?: string) => void;
  toggleProvider: (provider: string) => void;
};

const initialFilters: Filters = {
  providers: new Set(["AWS", "GCP", "AZURE", "EXCHANGE"]),
  search: "",
  latencyRange: [0, 1000],
  showRegions: true,
  showRealtime: true,
  showHistorical: true,
};

const LatencyCtx = createContext<LatencyState | undefined>(undefined);

export const useLatency = () => {
  const ctx = useContext(LatencyCtx);
  if (!ctx) throw new Error("useLatency must be used inside LatencyProvider");
  return ctx;
};

export const LatencyProvider = ({ children }: { children: ReactNode }) => {
  const [exchanges] = useState(EXCHANGES);
  const [regions] = useState<Region[] | null>([
    {
      id: "aws-us-east-1",
      provider: "AWS",
      code: "us-east-1",
      lat: 39,
      lng: -77,
    },
    {
      id: "gcp-asia-southeast1",
      provider: "GCP",
      code: "asia-southeast1",
      lat: 1.3,
      lng: 103.8,
    },
    {
      id: "azure-uk-south",
      provider: "AZURE",
      code: "uk-south",
      lat: 51.5,
      lng: -0.1,
    },
  ]);
  const [samplesRealtime, setRealtime] = useState<LatencySample[]>([]);
  // historical samples per pair (load initial)
  const [samplesHistory, setSamplesHistory] = useState<
    Record<string, LatencySample[]>
  >(() => {
    const map: Record<string, LatencySample[]> = {};
    for (const p of PAIRS) {
      map[p.id] = generateHistory(p.id, 60); // 60 minutes initial
    }
    return map;
  });

  const [filters, setFiltersState] = useState<Filters>(initialFilters);
  const [selectedPairId, setSelectedPairId] = useState<string | undefined>(
    PAIRS[0]?.id
  );

  // helper to update partial filters
  const setFilters = (patch: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  };

  // toggle provider in filters
  const toggleProvider = (provider: string) => {
    setFiltersState((prev) => {
      const newSet = new Set(prev.providers);
      if (newSet.has(provider)) newSet.delete(provider);
      else newSet.add(provider);
      return { ...prev, providers: newSet };
    });
  };

  // Simulation: create a "realtime" emitter that every 5s produces new samples for each pair
  useEffect(() => {
    let running = true;
    const intervalMs = 5000;
    async function tick() {
      // for each pair generate a new sample and append to both realtime and history
      const now = Date.now();
      const newRealtime: LatencySample[] = [];
      for (const pid in samplesHistory) {
        // base from latest sample
        const arr = samplesHistory[pid];
        const last = arr[arr.length - 1];
        const base = last ? last.ms : 50 + Math.random() * 80;
        const newMs = Math.max(
          2,
          Math.round(
            base + (Math.random() - 0.5) * 30 + Math.sin(now / 5000) * 8
          )
        );
        const [from, to] = pid.split("-");
        const sample: LatencySample = {
          id: `${pid}-${now}`,
          from,
          to,
          ms: newMs,
          ts: now,
        };
        newRealtime.push(sample);
        // append into history (keep up to 6k points)
        setSamplesHistory((prev) => {
          const copy = { ...prev };
          const arr = copy[pid] ? [...copy[pid]] : [];
          arr.push(sample);
          if (arr.length > 6 * 60) arr.splice(0, arr.length - 6 * 60); // keep last N
          copy[pid] = arr;
          return copy;
        });
      }
      // push into realtime circular buffer (keep last 500)
      setRealtime((prev) => {
        const merged = [...prev, ...newRealtime];
        return merged.slice(-500);
      });
    }

    (async function loop() {
      while (running) {
        tick();
        await new Promise((r) => setTimeout(r, intervalMs));
      }
    })();
    return () => {
      running = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      exchanges,
      regions,
      samplesRealtime,
      samplesHistory,
      filters,
      selectedPairId,
      setFilters,
      setSelectedPairId,
      toggleProvider,
    }),
    [
      exchanges,
      regions,
      samplesRealtime,
      samplesHistory,
      filters,
      selectedPairId,
    ]
  );

  return <LatencyCtx.Provider value={value}>{children}</LatencyCtx.Provider>;
};
