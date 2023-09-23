"use client";
import Link from "next/link";
import Button from "../Button";
import { MotionConfig, motion } from "framer-motion";

const childVariants = {
    hidden: {
        opacity: 0,
        y: -40,
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 2.56 + index * 0.07,
            ease: [0.13, 0.64, 0.26, 0.99],
        },
    }),
};

export default function Navbar() {
    return (
        <motion.div
            transition={{
                delay: 2,
                staggerChildren: 0.1,
                ease: [0.13, 0.64, 0.26, 0.99],
            }}
            className="bg-transparent pointer-events-none w-full pt-[45px] pb-[25px] flex justify-between px-[140px] text-[16px] font-bold absolute top-0"
        >
            <motion.div
                className="pointer-events-auto"
                initial="hidden"
                animate="visible"
                custom={0}
                variants={childVariants}
            >
                <Link
                    href="/"
                    className="text-[20px] font-bold mix-blend-difference"
                >
                    bmschoi
                </Link>
            </motion.div>
            <div className="flex gap-[12px] pointer-events-auto">
                <motion.span
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    variants={childVariants}
                >
                    <Button themeType="transparent">
                        <Link href="/">About</Link>
                    </Button>
                </motion.span>
                <motion.span
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variants={childVariants}
                >
                    <Button themeType="transparent">
                        <Link href="/">Works</Link>
                    </Button>
                </motion.span>
                <motion.span
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    variants={childVariants}
                >
                    <Button>
                        <Link href="/">Contact</Link>
                    </Button>
                </motion.span>
            </div>
        </motion.div>
    );
}
