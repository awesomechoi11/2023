"use client"; // This is a client component 👈🏽

import { motion } from "framer-motion";
import Button from "../Button";
import { email_svg, github_svg, linkedin_svg } from "../svg/socials";
import MainCanvas, { LetterStagger } from "../three/MainCanvas";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { relativePercent } from "../utils/math";

const childVariants = {
    hidden: {
        opacity: 0,
        x: 40,
    },
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 2.56 + (index + 4) * 0.07,
            ease: [0.13, 0.64, 0.26, 0.99],
        },
    }),
};

export default function Hero() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    if (isTabletOrMobile) {
        return (
            <div className="mx-12 mt-48 mb-32 max-[600px]:mx-4">
                <div className="flex gap-8 max-[600px]:gap-4">
                    <Image
                        width={20}
                        height={360}
                        alt="hero bar"
                        src="/mobilebar.png"
                        style={{
                            width: `${relativePercent(40)}vw`,
                            height: `${relativePercent(500)}vw`,
                        }}
                    />
                    <div>
                        <div
                            style={{
                                fontSize: `${relativePercent(124)}vw`,
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: `-${relativePercent(64)}vw`,
                                    marginTop: `-${relativePercent(24)}vw`,
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
                        </div>
                        <div
                            style={{
                                fontSize: `${relativePercent(68)}vw`,
                            }}
                        >
                            <LetterStagger>Based in</LetterStagger>{" "}
                            <span className="font-bold">
                                <LetterStagger>Los Angeles</LetterStagger>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ml-[148px] mr-[100px]">
            <div className="h-[650px] w-full">
                <MainCanvas />
            </div>
            <div className="flex justify-between items-end mb-24">
                <div className="flex gap-6">
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        variants={childVariants}
                    >
                        <Button paddingType="sym" themeType="light">
                            {github_svg}
                        </Button>
                    </motion.span>
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={childVariants}
                    >
                        <Button paddingType="sym" themeType="light">
                            {linkedin_svg}
                        </Button>
                    </motion.span>{" "}
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={childVariants}
                    >
                        <Button paddingType="sym" themeType="light">
                            {email_svg}
                        </Button>
                    </motion.span>
                </div>
                <div>
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        custom={4}
                        variants={childVariants}
                    >
                        <Button paddingType="sym" themeType="light">
                            <svg
                                width="26"
                                height="28"
                                viewBox="0 0 26 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.5 0V26M13.5 26L24 15.5606M13.5 26L3 15.5606"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            </svg>
                        </Button>
                    </motion.span>
                </div>
            </div>
        </div>
    );
}
