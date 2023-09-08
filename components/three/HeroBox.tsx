"use client"; // This is a client component 👈🏽
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vert from "./gradient/vert.vert";
import frag from "./gradient/frag.frag";
import { useRef } from "react";
import { getProject } from "@theatre/core";
// import { SheetProvider } from "@theatre/r3f";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { OrthographicCamera } from "@react-three/drei";
studio.initialize();
studio.extend(extension);

const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

const width = 300;
const height = 100;

export default function HeroBox() {
    return (
        <div className="w-[300px] h-[100px] rounded-full overflow-hidden inline-block">
            <Canvas className="w-[300px] h-[100px]">
                <ambientLight intensity={0.1} />
                <OrthographicCamera
                    makeDefault
                    left={-width / 2}
                    right={width / 2}
                    top={height / 2}
                    bottom={-height / 2}
                    near={0.1}
                    far={1000}
                    position={[0, 0, 5]}
                />
                <Box />
            </Canvas>
        </div>
    );
}

function Box() {
    const boxRef = useRef();
    useFrame(({ clock }) => {
        if (boxRef.current) {
            boxRef.current.material.uniforms.u_time.value =
                clock.oldTime * 0.01;
        }
    });
    // const EditablePlane = e(Plane, "plane");
    return (
        <SheetProvider sheet={demoSheet}>
            <e.mesh ref={boxRef} theatreKey="Plane" position={[0, 0, 0]}>
                <planeGeometry
                    attach="geometry"
                    args={[width, height]}
                ></planeGeometry>
                <shaderMaterial
                    attach="material"
                    fragmentShader={frag}
                    vertexShader={vert}
                    uniforms={{
                        u_time: { value: 0 },
                        u_aspect: { value: 3 },
                    }}
                />
                {/* <meshStandardMaterial /> */}
            </e.mesh>
        </SheetProvider>
    );
}
