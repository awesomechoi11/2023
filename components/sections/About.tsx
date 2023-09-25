"use client"; // This is a client component 👈🏽
import { useMediaQuery } from "react-responsive";
import FadeInDiv from "../FadeInDiv";
import { relativePercent } from "../utils/math";

export default function About() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div
      id="about"
      className="pl-36 pr-64 py-36 flex max-[1224px]:flex-col gap-8 max-[1224px]:pl-8 max-[1224px]:pr-8 justify-between bg-white text-black"
    >
      <div className="w-[948px] max-[1224px]:w-full">
        <FadeInDiv className="font-bold text-xl mb-6">About Me</FadeInDiv>
        <FadeInDiv
          className="text-[58px]"
          style={{
            fontSize: isTabletOrMobile
              ? `${relativePercent(100)}vw`
              : `${relativePercent(58)}vw`,
          }}
        >
          I believe storytelling creates
        </FadeInDiv>
        <FadeInDiv
          className="text-[58px]"
          style={{
            fontSize: isTabletOrMobile
              ? `${relativePercent(100)}vw`
              : `${relativePercent(58)}vw`,
          }}
        >
          meaningful & lasting connections
        </FadeInDiv>
      </div>
      <div className="max-w-[415px] max-[1224px]:w-full">
        <div className="mb-16">
          <FadeInDiv className="font-bold text-xl mb-4">Development</FadeInDiv>
          <FadeInDiv>
            With my technical knowledge and passion for motion and interaction,
            I am able to develop a versatile and lasting codebase. In my code, I
            make sure to express my passions to its fullest extent.
          </FadeInDiv>
        </div>
        <div>
          <FadeInDiv className="font-bold text-xl mb-4">Design</FadeInDiv>
          <FadeInDiv>
            I always strive to create meaningful experiences for users that
            combine multidisciplinary fields. To connect people with
            aesthetically pleasing, highly functional, accessible experiences.{" "}
          </FadeInDiv>
        </div>
      </div>
    </div>
  );
}
