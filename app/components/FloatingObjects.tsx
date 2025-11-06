"use client";
import { useRef, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const FloatingGeometry = memo(function FloatingGeometry({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[0.5, 24, 24]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.25}
        />
      </Sphere>
    </Float>
  );
});

const RotatingTorus = memo(function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[3, 0, -2]}>
      <torusGeometry args={[1, 0.3, 12, 64]} />
      <meshStandardMaterial
        color="#00bcd4"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
});

const RotatingBox = memo(function RotatingBox() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <mesh ref={ref} position={[-3, 1, -2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#4fc3f7"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
});

export default memo(function FloatingObjects() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]} // Limit pixel ratio for better performance
        performance={{ min: 0.5 }} // Allow frame skipping if needed
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        <FloatingGeometry position={[2, 1, 0]} color="#4fc3f7" speed={1.5} />
        <FloatingGeometry position={[-2, -1, -1]} color="#00bcd4" speed={2} />

        <RotatingTorus />
        <RotatingBox />
      </Canvas>
    </div>
  );
});
