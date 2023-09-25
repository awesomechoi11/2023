"use client";

import { motion } from "framer-motion";
import FadeInDiv from "../FadeInDiv";
import { relativePercent } from "../utils/math";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";

export default function Works() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className="px-6 mx-auto max-w-[1600px] relative z-0">
      <FadeInDiv className="mb-32 mt-32 transform-gpu relative">
        <div
          style={{
            fontSize: `${relativePercent(145)}vw`,
          }}
          className="text-white text-center font-bold font-['Gilroy'] uppercase"
        >
          Selected Works
        </div>
      </FadeInDiv>
      <FlippableCase
        fontScale={351}
        text="seaswap"
        bannerSrc="/seaswapbanner.png"
        href={"/seaswap"}
      />
      <FlippableCase
        fontScale={395}
        text="paymint"
        bannerSrc="/paymintbanner.png"
        href={"/paymint"}
      />
      <FlippableCase
        fontScale={205}
        text="Ignite hosting"
        bannerSrc="/ignitebanner.png"
        href={"/ignite"}
      />
      <FlippableCase
        fontScale={200}
        text="cashout kings"
        bannerSrc="/cashoutkingsbanner.png"
        href={"/cashoutkings"}
        disabled
      />
      <FlippableCase
        fontScale={290}
        text="coin pilot"
        bannerSrc="/coinpilotbanner.png"
        href={"/coinpilot"}
        disabled
      />
    </div>
  );
}

const FlippableCase = ({
  fontScale,
  bannerSrc,
  text,
  href,
  disabled = false,
}: {
  fontScale: number;
  bannerSrc: string;
  text: string;
  href: string;
  disabled?: boolean;
}) => {
  return (
    <FadeInDiv className="mb-32 max-[1224px]:mb-24 max-[624px]:mb-12 pt-16 h-[500px] max-[1224px]:h-[400px] max-[624px]:h-[300px] max-[424px]:h-[250px] relative">
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          perspective: "4020px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        className="w-full z-[1] absolute inset-0 "
        initial="hidden"
        whileHover="flipped"
      >
        <Link href={disabled ? "#" : href} className="absolute inset-0"></Link>
        <motion.div
          style={{
            backfaceVisibility: "hidden",
          }}
          variants={{
            hidden: {
              transform: `scale(0.9) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw) rotateX(0deg) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw)`,
            },
            flipped: {
              transform: `scale(0.9) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw) rotateX(90deg) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw)`,
            },
          }}
          className="text-white pointer-events-none absolute inset-0"
        >
          <div
            className=" text-center font-bold font-['Gilroy'] uppercase"
            style={{
              fontSize: `${relativePercent(fontScale)}vw`,
            }}
          >
            {text}
          </div>
          <div
            style={{
              marginTop: `-${relativePercent((fontScale * 35) / 205)}vw`,
            }}
            className="mx-24 relative z-10 max-[1224px]:mx-8 max-[1224px]:grid-cols-2 grid grid-cols-5 uppercase"
          >
            <span>2023</span>
            <span>UI/UX design</span>
            <span>branding</span>
          </div>
        </motion.div>
        <motion.div
          style={{
            fontSize: `${relativePercent(205)}vw`,
            backfaceVisibility: "hidden",
            background: "black",
          }}
          variants={{
            hidden: {
              transform: `scale(0.9) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw) rotateX(-90deg) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw)`,
            },
            flipped: {
              transform: `scale(0.9) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw) rotateX(0deg) translateZ(${relativePercent(
                (fontScale * 3) / 4
              )}vw)`,
            },
          }}
          className="text-white absolute pointer-events-none inset-0 text-center font-bold font-['Gilroy'] uppercase"
        >
          {disabled && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div
                className=" text-center font-bold font-['Gilroy'] uppercase"
                style={{
                  fontSize: `${relativePercent(160)}vw`,
                }}
              >
                coming soon
              </div>
            </div>
          )}
          <Image
            width={1920}
            height={520}
            alt={`${text} banner`}
            src={bannerSrc}
            className="absolute inset-0 max-h-[100%]"
            style={{ objectFit: "contain", opacity: disabled ? "24%" : "100%" }}
            priority
          />
        </motion.div>
      </motion.div>
      <div
        style={{
          fontSize: `${relativePercent(fontScale)}vw`,
        }}
        className="text-white pointer-events-none opacity-0 text-center font-bold font-['Gilroy'] uppercase"
      >
        {text}
      </div>
    </FadeInDiv>
  );
};
