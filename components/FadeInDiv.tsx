"use client";

import { AnimationProps, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

type FadeInDivProps = {
  className?: string | ClassNameValue[];
  children: React.ReactNode;
  animate?: AnimationProps["animate"];
  style?: any;
  show?: boolean;
  delayFactor?: number;
};

const FadeInDiv: React.FunctionComponent<FadeInDivProps> = ({
  children,
  className,
  animate,
  style,
  show = true,
  delayFactor = 0,
}) => {
  if (!Array.isArray(className)) className = [className];
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <motion.div
      className={twMerge(...className)}
      animate={
        isInView &&
        show &&
        (animate || {
          opacity: 1,
          y: 0,
          transition: {
            ease: [0.17, 0.67, 0.31, 0.99],
            duration: 1.3,
            delay: 0.07 * delayFactor,
          },
        })
      }
      initial={{
        opacity: 0,
        y: 30,
      }}
      ref={ref}
      style={style}
    >
      {children}
    </motion.div>
  );
};
export default FadeInDiv;
