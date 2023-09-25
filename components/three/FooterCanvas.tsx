"use client"; // This is a client component 👈🏽
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
//@ts-ignore
import vert from "./gradient/vert.vert";
//@ts-ignore
import frag from "./gradient/frag.frag";
import { OrthographicCamera, useTrailTexture } from "@react-three/drei";
import { motion, useMotionValue } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useMyTrailTexture } from "./useMyTrailTexture";

export default function FooterCanvas() {
  return (
    <div
      className="w-full h-full overflow-hidden inline-block select-none touch-none"
      style={{ pointerEvents: "none" }}
      onTouchMove={(e) => {
        e.preventDefault();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
      }}
    >
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.1} />
        <OrthoCam />
        <Blob />
      </Canvas>
    </div>
  );
}

function OrthoCam() {
  const { viewport } = useThree();

  return (
    <OrthographicCamera
      makeDefault
      left={-viewport.width / 2}
      right={viewport.width / 2}
      top={viewport.height / 2}
      bottom={-viewport.height / 2}
      near={0.1}
      far={1000}
      position={[0, 0, 5]}
    />
  );
}

function Blob() {
  const { viewport } = useThree();
  const centerRadius = useMotionValue(0);

  const width = viewport.width * viewport.factor;
  const height = viewport.height * viewport.factor;

  const [trailTexture, onMove] = useMyTrailTexture({
    width,
    height,
    radius: 100.3,
    intensity: 0.6,
    interpolate: 5,
  });

  const blobRef = useRef<THREE.Mesh>(null!);
  const uniformsRef = useRef({
    u_time: { value: 0 },

    u_aspect: { value: width / height },
    u_width: { value: width },
    u_height: { value: height },
    u_centerRadius: { value: 0 },
    u_trailTexture: { value: trailTexture },
  });

  useFrame(({ clock }, delta) => {
    if (blobRef.current) {
      //@ts-ignore
      blobRef.current.material.uniforms = uniformsRef.current;
      //@ts-ignore
      blobRef.current.material.uniforms.u_time.value = clock.oldTime * 0.001;

      uniformsRef.current.u_centerRadius.value = centerRadius.get();

      uniformsRef.current.u_aspect.value = width / height;
      uniformsRef.current.u_width.value = width;
      uniformsRef.current.u_height.value = height;
      uniformsRef.current.u_trailTexture.value = trailTexture;
    }
  });

  return (
    <mesh ref={blobRef} position={[0, 0, 0]} onPointerMove={onMove}>
      <planeGeometry attach="geometry" args={[width, height]}></planeGeometry>
      <shaderMaterial
        attach="material"
        fragmentShader={frag}
        vertexShader={vert}
        uniforms={uniformsRef.current}
      />
    </mesh>
  );
}
