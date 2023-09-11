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
import { OrthographicCamera, useTexture } from "@react-three/drei";
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
    Count: types.number(30, { range: [0, 30] }),
    CenterWobbleFactor: types.number(15, { range: [0, 30] }),
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
    const { particleData, upperBound } = useBlobParticleSim();
    const width = viewport.width * viewport.factor;
    const height = viewport.height * viewport.factor;
    const blobRef = useRef<THREE.Mesh>(null!);
    const introStage = useVal(introStageObj.props.Stage);
    const centerWobbleFactor = useVal(introStageObj.props.CenterWobbleFactor);
    const noise1 = useTexture(
        "https://cdn.bmschoi.dev/noisemaps/Perlin/Perlin%2010%20-%20512x512.png"
    );
    const uniformsRef = useRef({
        u_time: { value: 0 },
        u_ppos: { value: particleData.current.positions },
        u_pspos: { value: particleData.current.start },
        u_pcount: { value: particleData.current.maxCount },
        u_aspect: { value: width / height },
        u_upperBound: { value: upperBound },
        u_noise1: { value: noise1 },
        u_wobbling: { value: false },
        u_centerWobbleFactor: { value: 0 },
    });
    useFrame(({ clock }, delta) => {
        if (blobRef.current) {
            blobRef.current.material.uniforms = uniformsRef.current;
            blobRef.current.material.uniforms.u_time.value =
                clock.oldTime * 0.001;
            blobRef.current.material.uniforms.u_ppos.value =
                particleData.current.positions;
            blobRef.current.material.uniforms.u_pcount.value =
                particleData.current.maxCount;
        }
    });

    useEffect(() => {
        // need to use ref for uniforms since useFrame copies the function
        // and so variables from theatrejs dont get updated
        uniformsRef.current.u_wobbling.value = introStage === "wobble";
        uniformsRef.current.u_centerWobbleFactor.value = centerWobbleFactor;
    }, [centerWobbleFactor, introStage]);

    return (
        <SheetProvider sheet={introSheet}>
            <e.mesh ref={blobRef} theatreKey="Plane" position={[0, 0, 0]}>
                <planeGeometry
                    attach="geometry"
                    args={[width, height]}
                ></planeGeometry>
                <shaderMaterial
                    attach="material"
                    fragmentShader={frag}
                    vertexShader={vert}
                    uniforms={uniformsRef.current}
                />
            </e.mesh>
        </SheetProvider>
    );
}

export const useBlobParticleSim = () => {
    const { viewport } = useThree();
    const maxCount = 30;

    const introStage = useVal(introStageObj.props.Stage);
    const introParticleCount = useVal(introStageObj.props.Count);
    useEffect(() => {
        particleData.current.count = introParticleCount;
    }, [introParticleCount]);

    const particleData = useRef({
        count: Math.max(0, Math.min(maxCount, introParticleCount)),
        maxCount: maxCount,
        positions: new Float32Array(maxCount * 2),
        start: new Float32Array(maxCount * 2),
        inTime: new Float32Array(maxCount),
    });

    const upperBound = Math.max(
        viewport.width * viewport.factor,
        viewport.height * viewport.factor
    );

    function resetPosition(i2: number, time: number) {
        const index = i2 / 2;

        if ("collect" !== introStage) return;

        // dont reset if particle index is less than current limit
        if (index >= particleData.current.count) return;

        // generate random polar position
        const { positions, start, inTime } = particleData.current;
        const angle = Math.random() * Math.PI * 2;
        const radius = upperBound * (1 * Math.random() + 0.7);

        // convert polar to cartesian coords
        positions[i2] = radius * Math.cos(angle);
        positions[i2 + 1] = radius * Math.sin(angle);
        start[i2] = positions[i2];
        start[i2 + 1] = positions[i2 + 1];

        // random time for particles to animate in
        inTime[index] = time + index * (Math.random() * 200 + 300);
    }

    // const deltaSum = useRef(0);
    function update(delta: number, time: number) {
        // deltaSum.current += delta;
        const {
            maxCount: maxParticlesCount,
            count,
            positions: particlePositions,
            inTime,
        } = particleData.current;
        for (let i = 0; i < maxParticlesCount; i++) {
            const i2 = i * 2;

            // do nothing till its allowed to come in
            if (inTime[i] > time) {
                if (introStage !== "collect") {
                    inTime[i] = Infinity;
                } else {
                    if (inTime[i] === Infinity) resetPosition(i2, time);
                }
                continue;
            }

            // decrease position from center by arbitrary amnt
            // maybe animate this too
            particlePositions[i2] *= 0.993;
            particlePositions[i2 + 1] *= 0.993;
            const x = particlePositions[i2];
            const y = particlePositions[i2 + 1];

            // flat distance function, minRadius2 is arbitrary
            const minRadius2 = 20;
            if (minRadius2 > x * x + y * y && i <= count)
                resetPosition(i2, time);
        }
    }

    useFrame(({ clock }, delta) => {
        update(delta, clock.oldTime);
    });

    return {
        particleData,
        upperBound,
    };
};
