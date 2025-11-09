"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useLatency } from "../context/LatencyContext";

interface Exchange {
  id: string;
  name: string;
  lat: number;
  lng: number;
  provider: "AWS" | "GCP" | "AZURE" | "EXCHANGE" | string;
}

interface LatencySample {
  from: string;
  to: string;
  ms: number;
}

const PROVIDER_COLOR: Record<string, string> = {
  AWS: "#f59e0b",
  GCP: "#ef4444",
  AZURE: "#06b6d4",
  EXCHANGE: "#8b5cf6",
};

// Helper to convert lat/lng to 3D coordinates
function latLngToVector3(
  lat: number,
  lng: number,
  radius = 1.0
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -Math.sin(phi) * Math.cos(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x * radius, y * radius, z * radius);
}

function Marker({ ex, onClick }: { ex: Exchange; onClick?: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = latLngToVector3(ex.lat, ex.lng, 1.01);

  return (
    <mesh ref={ref} position={pos} onClick={onClick}>
      <sphereGeometry args={[0.02, 12, 12]} />
      <meshStandardMaterial
        color={PROVIDER_COLOR[ex.provider] ?? "#ffffff"}
        emissive={PROVIDER_COLOR[ex.provider] ?? "#ffffff"}
      />
    </mesh>
  );
}

function AnimatedArc({
  a,
  b,
  color,
}: {
  a: THREE.Vector3;
  b: THREE.Vector3;
  color: string;
}) {
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1.3);
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, [a, b]);

  const points = useMemo(() => curve.getPoints(80), [curve]);
  const geom = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const t = (Math.sin(clock.elapsedTime * 2) + 1) / 2;
      materialRef.current.opacity = 0.4 + t * 0.6;
    }
  });

  return (
    <primitive object={new THREE.Line(geom, undefined)}>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        linewidth={2}
        transparent
        opacity={0.7}
      />
    </primitive>
  );
}

function GlobeScene() {
  const { exchanges, samplesHistory, filters } = useLatency();
  const texture = useTexture("/earth.png");

  // Filter markers
  const markers = useMemo(() => {
    return exchanges.filter(
      (ex: Exchange) =>
        filters.providers.has(ex.provider) &&
        ex.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }, [exchanges, filters]);

  // Compute animated arcs based on latest latency samples
  const arcs = useMemo(() => {
    const result: { a: THREE.Vector3; b: THREE.Vector3; color: string }[] = [];

    Object.keys(samplesHistory).forEach((pid) => {
      const arr = samplesHistory[pid] as LatencySample[];
      if (!arr || arr.length === 0) return;
      const last = arr[arr.length - 1];

      const exA = exchanges.find((e: Exchange) => e.id === last.from);
      const exB = exchanges.find((e: Exchange) => e.id === last.to);
      if (!exA || !exB) return;

      if (
        !filters.providers.has(exA.provider) ||
        !filters.providers.has(exB.provider)
      )
        return;

      const a = latLngToVector3(exA.lat, exA.lng, 1.01);
      const b = latLngToVector3(exB.lat, exB.lng, 1.01);

      let color = "#10b981"; // green = low latency
      if (last.ms >= 150) color = "#ef4444"; // red = high latency
      else if (last.ms >= 80) color = "#f59e0b"; // yellow = medium

      result.push({ a, b, color });
    });

    return result;
  }, [samplesHistory, exchanges, filters.providers]);

  return (
    <>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Markers */}
      {markers.map((m: Exchange) => (
        <Marker
          key={m.id}
          ex={m}
          onClick={() => console.log("clicked", m.name)}
        />
      ))}

      {/* Animated Arcs */}
      {arcs.map((ar, idx) => (
        <AnimatedArc key={idx} a={ar.a} b={ar.b} color={ar.color} />
      ))}
    </>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-[70vh] md:h-[80vh]">
      <Canvas camera={{ position: [0, 0, 2.6], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 3, 5]} intensity={0.6} />
        <GlobeScene />
        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    </div>
  );
}
