"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 150;

export default function Constellation() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
    }
    return new Float32Array(positions);
  }, []);

  const velocities = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 0.002,
      y: (Math.random() - 0.5) * 0.002,
    }));
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.array[i * 3] += velocities[i].x;
      pos.array[i * 3 + 1] += velocities[i].y;

      // Bounce off boundaries to keep particles within view
      if (pos.array[i * 3] > 15 || pos.array[i * 3] < -15) velocities[i].x *= -1;
      if (pos.array[i * 3 + 1] > 10 || pos.array[i * 3 + 1] < -10) velocities[i].y *= -1;
    }
    pos.needsUpdate = true;
  });

  return (
    <>
      <CameraRig />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.8}
        />
      </points>

      <Connections pointsRef={pointsRef} />
    </>
  );
}

function CameraRig() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const targetX = pointer.x * 2;
    const targetY = pointer.y * 2;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function Connections({
  pointsRef,
}: {
  pointsRef: React.RefObject<THREE.Points | null>;
}) {
  const lineRef = useRef<THREE.LineSegments>(null);

  // Pre-allocate memory for lines to prevent garbage collection spikes
  const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(() => {
    if (!pointsRef.current || !lineRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    let vertexCount = 0;

    for (let i = 0; i < pos.length; i += 3) {
      for (let j = i + 3; j < pos.length; j += 3) {
        const dx = pos[i] - pos[j];
        const dy = pos[i + 1] - pos[j + 1];
        const dz = pos[i + 2] - pos[j + 2];

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 2.5) {
          linePositions[vertexCount++] = pos[i];
          linePositions[vertexCount++] = pos[i + 1];
          linePositions[vertexCount++] = pos[i + 2];

          linePositions[vertexCount++] = pos[j];
          linePositions[vertexCount++] = pos[j + 1];
          linePositions[vertexCount++] = pos[j + 2];
        }
      }
    }

    const lineGeo = lineRef.current.geometry;
    lineGeo.setDrawRange(0, vertexCount / 3);
    lineGeo.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>

      <lineBasicMaterial
        color="#66ffff"
        transparent
        opacity={0.15}
      />
    </lineSegments>
  );
}
