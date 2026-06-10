"use client";

import { Canvas } from "@react-three/fiber";
import Constellation from "./Constellation";

export default function ConstellationBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Constellation />
      </Canvas>
    </div>
  );
}
