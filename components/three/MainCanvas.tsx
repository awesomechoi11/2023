"use client"; // This is a client component 👈🏽
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vert from "./gradient/vert.vert";
import frag from "./gradient/frag.frag";
import { useEffect, useRef, useState } from "react";
import { getProject, types } from "@theatre/core";
// import { SheetProvider } from "@theatre/r3f";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { OrthographicCamera } from "@react-three/drei";
import { useVal } from "@theatre/react";
studio.initialize();
studio.extend(extension);

const introSheet = getProject("2023").sheet("Intro");
const introStageObj = introSheet.object("Stage", {
    Stage: types.stringLiteral("off", {
        off: "Off",
        collect: "Collect",
        wobble: "Wobble",
        pill: "Pill",
    }),
});

export default function MainCanvas() {
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        setIsReady(true);
    }, []);

    return (
        <div className="w-full h-full absolute overflow-hidden inline-block">
            <Canvas className="w-full h-full">
                <ambientLight intensity={0.1} />
                <OrthoCam />
                <Box />
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

function Box() {
    const { viewport } = useThree();
    const { particleData, update, upperBound } = useParticleSim({ count: 30 });
    const width = viewport.width * viewport.factor;
    const height = viewport.height * viewport.factor;
    const boxRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }, delta) => {
        if (boxRef.current) {
            boxRef.current.material.uniforms.u_time.value =
                clock.oldTime * 0.001;
            boxRef.current.material.uniforms.u_ppos.value =
                particleData.current.positions;
            boxRef.current.material.uniforms.u_pcount.value =
                particleData.current.count;
        }
        update(delta);
    });
    // const EditablePlane = e(Plane, "plane");
    return (
        <SheetProvider sheet={introSheet}>
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
                        u_ppos: { value: particleData.current.positions },
                        u_pspos: { value: particleData.current.start },
                        u_pcount: { value: particleData.current.count },
                        u_aspect: { value: width / height },
                        u_center: {
                            value: [width / 2, height / 2],
                        },
                        u_upperBound: { value: upperBound },
                    }}
                />
            </e.mesh>
        </SheetProvider>
    );
}

export const useParticleSim = ({ count }: { count: number }) => {
    const { viewport } = useThree();
    const particleData = useRef({
        count: count,
        positions: new Float32Array(count * 2),
        start: new Float32Array(count * 2),
    });

    const upperBound = Math.max(
        viewport.width * viewport.factor,
        viewport.height * viewport.factor
    );
    const introStage = useVal(introStageObj.props.Stage);

    useEffect(() => {
        switch (introStage) {
            case "off":
                break;
            case "collect":
                break;
            case "wobble":
                break;
            case "pill":
                break;
            default:
                break;
        }
        // get a random position of particle based on radial coords
        const { count } = particleData.current;
        for (let i = 0; i < count; i++) {
            const i3 = i * 2;
            resetPosition(i3);
        }
    }, [introStage]);

    function resetPosition(index: number) {
        const { positions, start } = particleData.current;
        const angle = Math.random() * Math.PI * 2;
        const radius = upperBound * (1 * Math.random() + 0.4);
        // polar to cartesian coords

        positions[index] = radius * Math.cos(angle);
        positions[index + 1] = radius * Math.sin(angle);
        start[index] = positions[index];
    }

    const deltaSum = useRef(0);
    function update(delta) {
        deltaSum.current += delta;
        const upperBound = Math.max(
            viewport.width * viewport.factor,
            viewport.height * viewport.factor
        );
        const {
            count: particlesCount,
            positions: particlePositions,
            start,
        } = particleData.current;
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 2;

            particlePositions[i3] *= 0.993;
            particlePositions[i3 + 1] *= 0.993;
            let x = particlePositions[i3];
            let y = particlePositions[i3 + 1];
            if (20 > x * x + y * y) resetPosition(i3);
        }
    }
    return {
        particleData,
        update,
        upperBound,
    };
};
