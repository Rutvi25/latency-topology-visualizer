import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LatencyProvider } from "../context/LatencyContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LatencyProvider>
      <Component {...pageProps} />
    </LatencyProvider>
  );
}
