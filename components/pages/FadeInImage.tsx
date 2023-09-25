"use client";
import Image, { ImageProps } from "next/image";
import FadeInDiv from "../FadeInDiv";
import { useState } from "react";

export default function FadeInImage({
  customIndex = 0,
  alt,
  src,
  className,
  ...props
}: ImageProps & {
  customIndex?: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <FadeInDiv
      show={loaded}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: customIndex * 0.07 + 0.1,
          ease: [0.17, 0.67, 0.31, 0.99],
          duration: 1.7,
        },
      }}
      className={className}
    >
      <Image {...props} alt={alt} src={src} onLoad={() => setLoaded(true)} />
    </FadeInDiv>
  );
}
