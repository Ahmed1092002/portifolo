"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry({
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
      <Sphere args={[0.5, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={[3, 0, -2]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#00bcd4"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function RotatingBox() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={[-3, 1, -2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#4fc3f7"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function FloatingObjects() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <FloatingGeometry position={[2, 1, 0]} color="#4fc3f7" speed={1.5} />
        <FloatingGeometry position={[-2, -1, -1]} color="#00bcd4" speed={2} />
        <FloatingGeometry position={[0, 2, -2]} color="#0288d1" speed={1.8} />

        <RotatingTorus />
        <RotatingBox />
      </Canvas>
    </div>
  );
}
