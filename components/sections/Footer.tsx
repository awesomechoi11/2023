"use client";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Button from "../Button";
import FadeInDiv from "../FadeInDiv";
import { email_svg, github_svg, linkedin_svg } from "../svg/socials";
import FooterCanvas from "../three/FooterCanvas";
import { relativePercent } from "../utils/math";
import { useRef } from "react";
import Link from "next/link";

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
      smoothing: 0.7,
      interpolate: 2,
    },
  }),
};

export default function Footer() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref}>
      <div className="max-w-[1680px] mx-auto px-6 mb-6">
        <div className="flex gap-52 mb-12 max-[1224px]:gap-24 max-[1224px]:flex-col">
          <div
            className=""
            style={{
              fontSize: isTabletOrMobile
                ? `${relativePercent(144)}vw`
                : `${relativePercent(84)}vw`,
            }}
          >
            <FadeInDiv>Creating interactive</FadeInDiv>
            <FadeInDiv>experiences for the web. </FadeInDiv>
          </div>
          <div>
            <FadeInDiv className="mb-4 font-bold text-xl">Contact</FadeInDiv>
            <FadeInDiv className="text-xl sm:text-2xl">
              <Link href="mailto:brandonchoi2015@gmail.com">
                brandonchoi2016@gmail.com
              </Link>
            </FadeInDiv>
          </div>
        </div>
        <div className="flex gap-6">
          <motion.span
            initial="hidden"
            animate="visible"
            custom={0}
            variants={childVariants}
          >
            <Link href="https://github.com/awesomechoi11">
              <Button paddingType="sym" themeType="light">
                {github_svg}
              </Button>
            </Link>
          </motion.span>
          <motion.span
            initial="hidden"
            animate="visible"
            custom={1}
            variants={childVariants}
          >
            <Link href="https://www.linkedin.com/in/bmschoi/">
              <Button paddingType="sym" themeType="light">
                {linkedin_svg}
              </Button>
            </Link>
          </motion.span>{" "}
          <motion.span
            initial="hidden"
            animate="visible"
            custom={2}
            variants={childVariants}
          >
            <Link href="mailto:brandonchoi2015@gmail.com">
              <Button paddingType="sym" themeType="light">
                {email_svg}
              </Button>
            </Link>
          </motion.span>
        </div>
      </div>
      <div className="w-full h-[360px] relative">
        <div
          className="z-50 pointer-events-none absolute top-0 w-full h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5060224773503151) 36%, rgba(0,0,0,0.2595238779105392) 65%, rgba(0,0,0,0) 100%)",
          }}
        />

        <FooterCanvas />
      </div>
    </div>
  );
}
