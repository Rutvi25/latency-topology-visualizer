export type Provider = "AWS" | "GCP" | "AZURE" | "EXCHANGE";

export type Exchange = {
  id: string;
  name: string;
  provider: Provider;
  lat: number;
  lng: number;
  city?: string;
};

export type Region = {
  id: string;
  provider: Provider;
  code: string;
  lat: number;
  lng: number;
};

export type LatencySample = {
  id: string;
  from: string;
  to: string;
  ms: number;
  ts: number;
};

// 🌍 Expanded Exchanges (20+ global markers)
export const EXCHANGES: Exchange[] = [
  { id: "binance", name: "Binance", provider: "AWS", lat: 35.6762, lng: 139.6503, city: "Tokyo" },
  { id: "okx", name: "OKX", provider: "GCP", lat: 1.3521, lng: 103.8198, city: "Singapore" },
  { id: "bybit", name: "Bybit", provider: "AZURE", lat: 51.5074, lng: -0.1278, city: "London" },
  { id: "deribit", name: "Deribit", provider: "AWS", lat: 52.3702, lng: 4.8952, city: "Amsterdam" },
  { id: "coinbase", name: "Coinbase", provider: "GCP", lat: 37.7749, lng: -122.4194, city: "San Francisco" },
  { id: "kraken", name: "Kraken", provider: "AZURE", lat: 47.6062, lng: -122.3321, city: "Seattle" },
  { id: "bitfinex", name: "Bitfinex", provider: "AWS", lat: 40.7128, lng: -74.0060, city: "New York" },
  { id: "wazirx", name: "WazirX", provider: "GCP", lat: 19.0760, lng: 72.8777, city: "Mumbai" },
  { id: "upbit", name: "Upbit", provider: "AZURE", lat: 37.5665, lng: 126.9780, city: "Seoul" },
  { id: "bitstamp", name: "Bitstamp", provider: "EXCHANGE", lat: 46.0569, lng: 14.5058, city: "Ljubljana" },
  { id: "huobi", name: "Huobi", provider: "AWS", lat: 1.29, lng: 103.85, city: "Singapore" },
  { id: "kucoin", name: "KuCoin", provider: "GCP", lat: 22.3193, lng: 114.1694, city: "Hong Kong" },
  { id: "gateio", name: "Gate.io", provider: "AZURE", lat: 31.2304, lng: 121.4737, city: "Shanghai" },
  { id: "bitget", name: "Bitget", provider: "AWS", lat: 34.6937, lng: 135.5023, city: "Osaka" },
  { id: "gemini", name: "Gemini", provider: "GCP", lat: 40.7128, lng: -74.0060, city: "New York" },
  { id: "poloniex", name: "Poloniex", provider: "AZURE", lat: 25.2048, lng: 55.2708, city: "Dubai" },
  { id: "bitmart", name: "BitMart", provider: "AWS", lat: 34.0522, lng: -118.2437, city: "Los Angeles" },
  { id: "luno", name: "Luno", provider: "GCP", lat: -26.2041, lng: 28.0473, city: "Johannesburg" },
  { id: "bitso", name: "Bitso", provider: "AZURE", lat: 19.4326, lng: -99.1332, city: "Mexico City" },
  { id: "ripple", name: "Ripple", provider: "EXCHANGE", lat: 37.3382, lng: -121.8863, city: "San Jose" },
];

// ☁️ Cloud Regions
export const REGIONS: Region[] = [
  { id: "aws-us-east-1", provider: "AWS", code: "us-east-1", lat: 39.0, lng: -77.0 },
  { id: "aws-eu-west-1", provider: "AWS", code: "eu-west-1", lat: 53.35, lng: -6.26 },
  { id: "aws-ap-south-1", provider: "AWS", code: "ap-south-1", lat: 19.07, lng: 72.87 },
  { id: "gcp-us-central1", provider: "GCP", code: "us-central1", lat: 41.8781, lng: -93.0977 },
  { id: "gcp-asia-southeast1", provider: "GCP", code: "asia-southeast1", lat: 1.3, lng: 103.8 },
  { id: "azure-eastus", provider: "AZURE", code: "eastus", lat: 37.4, lng: -79.2 },
  { id: "azure-uksouth", provider: "AZURE", code: "uksouth", lat: 51.5, lng: -0.1 },
];

// 🔁 Many more latency pairs for visible arcs
export const PAIRS = [
  { id: "binance-okx", a: "binance", b: "okx" },
  { id: "binance-bybit", a: "binance", b: "bybit" },
  { id: "okx-deribit", a: "okx", b: "deribit" },
  { id: "bybit-deribit", a: "bybit", b: "deribit" },
  { id: "coinbase-kraken", a: "coinbase", b: "kraken" },
  { id: "kraken-bitfinex", a: "kraken", b: "bitfinex" },
  { id: "wazirx-upbit", a: "wazirx", b: "upbit" },
  { id: "bitfinex-bitstamp", a: "bitfinex", b: "bitstamp" },
  { id: "binance-wazirx", a: "binance", b: "wazirx" },
  { id: "okx-coinbase", a: "okx", b: "coinbase" },
  { id: "bitmart-luno", a: "bitmart", b: "luno" },
  { id: "bitso-ripple", a: "bitso", b: "ripple" },
  { id: "gemini-bitstamp", a: "gemini", b: "bitstamp" },
  { id: "bitfinex-luno", a: "bitfinex", b: "luno" },
  { id: "kucoin-gateio", a: "kucoin", b: "gateio" },
  { id: "bitget-okx", a: "bitget", b: "okx" },
  { id: "huobi-bybit", a: "huobi", b: "bybit" },
  { id: "poloniex-bitmart", a: "poloniex", b: "bitmart" },
  { id: "bitso-kraken", a: "bitso", b: "kraken" },
  { id: "wazirx-binance", a: "wazirx", b: "binance" },
  { id: "bybit-coinbase", a: "bybit", b: "coinbase" },
  { id: "upbit-binance", a: "upbit", b: "binance" },
  { id: "ripple-kraken", a: "ripple", b: "kraken" },
  { id: "luno-bitstamp", a: "luno", b: "bitstamp" },
  { id: "bitmart-okx", a: "bitmart", b: "okx" },
];

// ⏱️ Generate random latency history
export function generateHistory(pairId: string, minutes = 60): LatencySample[] {
  const samples: LatencySample[] = [];
  const now = Date.now();
  const count = Math.floor((minutes * 60) / 10);
  let base = 40 + Math.random() * 100;

  for (let i = count - 1; i >= 0; i--) {
    const ts = now - i * 10000;
    base += (Math.random() - 0.5) * 10;
    if (base < 10) base = 10;
    const ms = Math.round(base + Math.sin(ts / 8000) * 15);
    samples.push({
      id: `${pairId}-${ts}`,
      from: pairId.split("-")[0],
      to: pairId.split("-")[1],
      ms,
      ts,
    });
  }
  return samples;
}
