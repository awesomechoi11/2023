"use client"; // This is a client component 👈🏽
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
//@ts-ignore
import vert from "./blob/vert.vert";
//@ts-ignore
import frag from "./blob/frag.frag";
import { useCallback, useEffect, useRef, useState } from "react";
import { Html, OrthographicCamera } from "@react-three/drei";
import {
    MotionValue,
    cancelFrame,
    frame,
    motion,
    useAnimate,
    useAnimationControls,
    useIsomorphicLayoutEffect,
    useMotionTemplate,
    useMotionValue,
} from "framer-motion";

import { animate } from "framer-motion";
import { createScreenScale } from "../utils/math";

export default function MainCanvas() {
    return (
        <div
            className="w-full h-full overflow-hidden inline-block"
            style={{ pointerEvents: "none" }}
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

//https://github.com/framer/motion/blob/main/packages/framer-motion/src/value/use-combine-values.ts#L6
function useCustomMotionTemplate<R>(
    values: MotionValue[],
    combineValues: Function
) {
    /**
     * Initialise the returned motion value. This remains the same between renders.
     */
    const value = useMotionValue(combineValues());

    /**
     * Create a function that will update the template motion value with the latest values.
     * This is pre-bound so whenever a motion value updates it can schedule its
     * execution in Framesync. If it's already been scheduled it won't be fired twice
     * in a single frame.
     */
    const updateValue = () => value.set(combineValues());

    /**
     * Synchronously update the motion value with the latest values during the render.
     * This ensures that within a React render, the styles applied to the DOM are up-to-date.
     */
    updateValue();

    /**
     * Subscribe to all motion values found within the template. Whenever any of them change,
     * schedule an update.
     */
    useIsomorphicLayoutEffect(() => {
        const scheduleUpdate = () => frame.update(updateValue, false, true);
        const subscriptions = values.map((v) => v.on("change", scheduleUpdate));

        return () => {
            subscriptions.forEach((unsubscribe) => unsubscribe());
            cancelFrame(updateValue);
        };
    });

    return value;
}

function Blob() {
    const { viewport } = useThree();
    const [complete, setComplete] = useState(false);
    const centerRadius = useMotionValue(0);
    const incrementCenterRadius = useCallback(
        function incrementCenterRadius(increment: number) {
            centerRadius.set(Math.min(centerRadius.get() + increment, 50));
            if (centerRadius.get() + increment === 50 && !complete) {
                setComplete(true);
            }
        },
        [centerRadius, complete]
    );
    const { particleData } = useBlobParticleSim({
        incrementCenterRadius,
        complete,
    });
    const width = viewport.width * viewport.factor;
    const height = viewport.height * viewport.factor;
    const barX = useMotionValue(0);
    const barHeight = useMotionValue(0);
    const barSkew = useMotionValue(0);
    const heroControls = useAnimationControls();
    const screenScale = createScreenScale(width);
    const points = useCustomMotionTemplate([barSkew, barX], () => {
        return [
            `polygon(`,
            `${width / 2 + barSkew.get() / 2 + 30 + barX.get()}px `,
            `0px,`,
            `${width}px `,
            `0px,`,
            `${width}px `,
            `${screenScale(300)}px,`,
            `${width / 2 - barSkew.get() / 2 + 30 + barX.get()}px `,
            `${screenScale(300)}px`,
            `)`,
        ].join("");
    });
    const blobRef = useRef<THREE.Mesh>(null!);
    const uniformsRef = useRef({
        u_time: { value: 0 },
        u_ppos: { value: particleData.current.positions },
        u_pspos: { value: particleData.current.start },
        u_pcount: { value: particleData.current.maxCount },
        u_aspect: { value: width / height },
        u_width: { value: width },
        u_height: { value: height },
        u_centerRadius: { value: 0 },
        u_barX: { value: 0 },
        u_barHeight: { value: 0 },
        u_barSkew: { value: 0 },
    });

    useEffect(() => {
        if (complete) {
            barX.set(-width / 2 + screenScale(150));
            barHeight.set(screenScale(150));
        }
    }, [width, height]);

    useFrame(({ clock }, delta) => {
        if (blobRef.current) {
            //@ts-ignore
            blobRef.current.material.uniforms = uniformsRef.current;
            //@ts-ignore
            blobRef.current.material.uniforms.u_time.value =
                clock.oldTime * 0.001;
            //@ts-ignore
            blobRef.current.material.uniforms.u_ppos.value =
                particleData.current.positions;
            //@ts-ignore
            blobRef.current.material.uniforms.u_pcount.value =
                particleData.current.maxCount;
            uniformsRef.current.u_centerRadius.value = centerRadius.get();
            uniformsRef.current.u_barX.value = barX.get();
            uniformsRef.current.u_barHeight.value = barHeight.get();
            uniformsRef.current.u_barSkew.value = barSkew.get();
            uniformsRef.current.u_aspect.value = width / height;
            uniformsRef.current.u_width.value = width;
            uniformsRef.current.u_height.value = height;
        }
    });
    const [animFinished, setAnimFinished] = useState(false);
    useEffect(() => {
        if (complete) {
            const duration = 0.8;
            const delay = 0.14;
            animate(centerRadius, 0, {
                duration: duration,
                ease: [0.13, 0.64, 0.26, 0.99],
            });
            animate(barHeight, screenScale(150), {
                duration: duration,
                ease: [0.13, 0.64, 0.26, 0.99],
            });
            heroControls.start("visible", {
                delay: animFinished ? 0 : delay + duration,
                duration: duration,
                ease: [0.13, 0.64, 0.26, 0.99],
            });
            animate(barX, -width / 2 + screenScale(150), {
                duration: duration,
                ease: [0.13, 0.64, 0.26, 0.99],
                delay: animFinished ? 0 : delay + duration,
            });
            animate(barSkew, 30, {
                duration: duration / 2,
                ease: [0.13, 0.64, 0.26, 0.99],
                delay: animFinished ? 0 : delay + duration,
            }).then(() => {
                animate(barSkew, 0, {
                    duration: duration / 2,
                    ease: [0.13, 0.64, 0.26, 0.99],
                });
            });
            if (!animFinished) setAnimFinished(true);
        }
    }, [complete]);

    return (
        <>
            <mesh ref={blobRef} position={[0, 0, 0]}>
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
            </mesh>
            <Html
                as="div" // Wrapping element (default: 'div')
                //   wrapperClass // The className of the wrapping element (default: undefined)
                prepend // Project content behind the canvas (default: false)
                // center // Adds ligns to the upper-left corner, fills ta -50%/-50% css transform (default: false) [ignored in transform mode]
                // fullscreen // Ahe screen (default:false) [ignored in transform mode]
                // distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                // zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                //   portal={domnodeRef} // Reference to target container (default=undefined)
                // transform // If true, applies matrix3d transformations (default=false)
                //   sprite // Renders as sprite, but only in transform mode (default=false)
                //   calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
                //   occlude={[ref]} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                //   onOcclude={(visible) => null} // Callback when the visibility changes (default: undefined)
                //   {...groupProps} // All THREE.Group props are valid
                //   {...divProps} // All HTMLDivElement props are valid
                position={[-width / 2, screenScale(300 / 2), 0]}
            >
                <motion.div
                    className="absolute top-0 w-screen left-0 right-0"
                    style={{
                        clipPath: points,
                        height: screenScale(300),
                    }}
                >
                    <motion.div
                        style={{
                            marginLeft: `${screenScale(240)}px`,
                            marginTop: `-${screenScale(24)}px`,
                        }}
                        animate={heroControls}
                        initial="hidden"
                        variants={{
                            hidden: {
                                opacity: 0,
                                x: 100,
                            },
                            visible: {
                                opacity: 1,
                                x: 0,
                            },
                        }}
                    >
                        <motion.div
                            className={`font-bold relative w-full`}
                            style={{
                                fontSize: `${screenScale(80)}px`,
                                marginBottom: `${screenScale(32)}px`,
                            }}
                            id="heroclipcontent"
                        >
                            <div
                                style={{
                                    marginBottom: `-${screenScale(44)}px`,
                                }}
                            >
                                <LetterStagger>
                                    Creating interactive
                                </LetterStagger>
                            </div>
                            <div>
                                <LetterStagger>
                                    experiences for the web.
                                </LetterStagger>
                            </div>
                        </motion.div>
                        <motion.div
                            style={{
                                fontSize: `${screenScale(24)}px`,
                                marginBottom: `${screenScale(200)}px`,
                            }}
                        >
                            <LetterStagger>Based in</LetterStagger>{" "}
                            <span className="font-bold">
                                <LetterStagger>Los Angeles</LetterStagger>
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </Html>
        </>
    );
}

export function LetterStagger({ children }: { children: string }) {
    return (
        <motion.span className="inline-block">
            {children.split("").map((letter: string, index: number) => {
                if (letter === " ")
                    return (
                        <span
                            key={letter + index}
                            className="overflow-hidden inline-block"
                        >
                            <span className="whitespace-pre"> </span>
                        </span>
                    );

                return (
                    <motion.span
                        key={letter + index}
                        className="overflow-hidden inline-block"
                    >
                        <motion.span
                            variants={{
                                hidden: {
                                    x: -70,
                                },
                                visible: {
                                    x: 0,
                                    transition: {
                                        delay: index,
                                    },
                                },
                            }}
                            className="inline-block"
                        >
                            {letter}
                        </motion.span>
                    </motion.span>
                );
            })}
        </motion.span>
    );
}

export const useBlobParticleSim = ({
    incrementCenterRadius,
    complete,
}: {
    incrementCenterRadius: Function;
    complete: boolean;
}) => {
    const { viewport } = useThree();
    const width = viewport.width * viewport.factor;

    const maxCount = 45;

    const particleData = useRef({
        count: maxCount,
        maxCount: maxCount,
        positions: new Float32Array(maxCount * 2),
        start: new Float32Array(maxCount * 2),
        inTime: new Float32Array(maxCount),
    });

    function resetPosition(i2: number, time: number) {
        const index = i2 / 2;

        if (complete) return;

        // dont reset if particle index is less than current limit
        if (index >= particleData.current.count) return;

        incrementCenterRadius(1);

        // generate random polar position
        const { positions, start, inTime } = particleData.current;
        const angle = Math.random() * Math.PI * 2;
        const radius = width * (1 * Math.random() + 0.7);

        // convert polar to cartesian coords
        positions[i2] = radius * Math.cos(angle);
        positions[i2 + 1] = radius * Math.sin(angle);
        start[i2] = positions[i2];
        start[i2 + 1] = positions[i2 + 1];

        // random time for particles to animate in
        inTime[index] = time + index * (Math.random() * 100 + 100);
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
                if (complete) {
                    inTime[i] = Infinity;
                } else {
                    if (inTime[i] === Infinity) resetPosition(i2, time);
                }
                continue;
            }

            // decrease position from center by arbitrary amnt
            // maybe animate this too
            particlePositions[i2] *= 0.96;
            particlePositions[i2 + 1] *= 0.96;
            const x = particlePositions[i2];
            const y = particlePositions[i2 + 1];

            // flat distance function, minRadius2 is arbitrary
            const minRadius2 = 40;
            if (minRadius2 > x * x + y * y && i <= count)
                resetPosition(i2, time);
        }
    }

    useFrame(({ clock }, delta) => {
        update(delta, clock.oldTime);
    });

    return {
        particleData,
    };
};
