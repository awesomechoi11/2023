import Navbar from "@/components/navbar/Navbar";
import FadeInImage from "@/components/pages/FadeInImage";
import Footer from "@/components/sections/Footer";
import Image from "next/image";

export default function Seaswap() {
  return (
    <>
      <div className="absolute top-0 h-full overflow-auto w-full">
        <main className="relative text-xl">
          {/* Case Banner */}
          <div className="mx-4 sm:mx-16 lg:mx-24 relative mt-36 mb-10">
            <Image
              width={1920}
              height={520}
              alt="seaswap hosting banner"
              src={"/seaswapbanner.png"}
              className="opacity-25"
              style={{ objectFit: "contain" }}
              priority
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="font-bold uppercase text-[54px] lg:text-[110px]">
                seaswap
              </div>
            </div>
          </div>

          {/* WIP banner */}
          <div className="flex flex-col gap-3 text-black bg-white py-5 items-center mb-32 px-4 text-center">
            <div className="font-bold">Work In Progress</div>
            <div>Comprehensive case study coming soon</div>
          </div>
          {/* introduction */}
          <div className="mx-4 sm:mx-16 lg:mx-24 flex justify-end mb-32">
            <div className="max-w-4xl">
              <div className="font-bold mb-6">Introduction</div>
              <div>
                SeaSwap, a secure NFT swapping platform, is dedicated to
                providing users with a safe and intuitive environment for
                trading non-fungible tokens (NFTs). This case study delves into
                the design elements that define SeaSwap&apos;s unique identity,
                emphasizing the primary color scheme of white and blue, subtle
                ocean wave accents, and the selection of fonts - Gilroy and SF
                Mono. The pivotal role of the design team in shaping the
                platform&apos;s user experience is central to this discussion.{" "}
              </div>
            </div>
          </div>
          <div className="p-4 py-12 sm:p-16 flex gap-12 max-w-7xl mx-auto items-center flex-col mb-32 bg-white text-black">
            <div className="font-bold uppercase flex flex-col items-center">
              challenges
              <div className="border-b w-[45px] border-b-black" />
            </div>
            <div className="flex gap-16 flex-col lg:flex-row text-center">
              <div className="flex flex-col items-center max-w-[340px]">
                <div className="font-bold flex gap-2 items-center mb-6">
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.5" cy="13" r="13" fill="#303030" />
                    <path
                      d="M11.1585 8.84932L13.8101 7.91264H15.5393V18H13.5507V10.0166L11.6485 10.5498L11.1585 8.84932Z"
                      fill="white"
                    />
                  </svg>
                  Complexity of NFTs
                </div>
                <div>
                  NFTs can be complex for new users to understand. Simplifying
                  the process of creating, buying, and swapping NFTs while
                  maintaining security is a significant UX challenge.
                </div>
              </div>
              <div className="flex flex-col items-center max-w-[340px]">
                <div className="font-bold flex gap-2 items-center mb-6">
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.5" cy="13" r="13" fill="#303030" />
                    <path
                      d="M17.1332 18H10.3891V16.5157L13.8332 12.9707C14.597 12.1637 14.986 11.4864 14.986 10.9533C14.986 10.1607 14.4384 9.6419 13.6747 9.6419C12.9109 9.6419 12.3489 10.031 11.9887 10.8236L10.317 9.84365C10.9511 8.46024 12.2192 7.71089 13.6459 7.71089C14.5537 7.71089 15.3463 7.9991 15.9948 8.57552C16.6432 9.13753 16.9747 9.9157 16.9747 10.8812C16.9747 11.9332 16.4271 12.9995 15.3175 14.1092L13.3432 16.0834H17.1332V18Z"
                      fill="white"
                    />
                  </svg>
                  Onboarding and Education
                </div>
                <div>
                  Introducing newcomers to the world of blockchain and NFTs
                  while keeping the onboarding process user-friendly and
                  informative can be challenging.
                </div>
              </div>
              <div className="flex flex-col items-center max-w-[340px]">
                <div className="font-bold flex gap-2 items-center mb-6">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13" cy="13" r="13" fill="#303030" />
                    <path
                      d="M14.0869 12.7494C14.769 12.9511 15.3214 13.3066 15.7441 13.8157C16.1764 14.3153 16.3926 14.9205 16.3926 15.6315C16.3926 16.669 16.0419 17.4808 15.3406 18.0668C14.6489 18.6529 13.7987 18.9459 12.79 18.9459C12.0022 18.9459 11.2961 18.7682 10.6716 18.4127C10.0568 18.0476 9.61005 17.5144 9.33144 16.8131L11.0319 15.8332C11.2817 16.6114 11.8677 17.0005 12.79 17.0005C13.2991 17.0005 13.693 16.8804 13.9716 16.6402C14.2598 16.3904 14.4039 16.0542 14.4039 15.6315C14.4039 15.2184 14.2598 14.8869 13.9716 14.6371C13.693 14.3874 13.2991 14.2625 12.79 14.2625H12.3577L11.5939 13.1096L13.5825 10.5157H9.63406V8.65678H15.9747V10.2996L14.0869 12.7494Z"
                      fill="white"
                    />
                  </svg>
                  Responsive Design
                </div>
                <div>
                  Ensuring a seamless user experience on both desktop and mobile
                  devices, given the diversity of the user base, requires
                  careful design and development.
                </div>
              </div>
            </div>
          </div>
          {/* discovery & research */}
          <div className="px-4 mb-32 flex flex-col lg:px-14 lg:mx-auto max-w-[1500px] items-center lg:items-start">
            <div className="max-w-md mb-32">
              <div className="font-bold uppercase flex flex-col mb-6">
                Discovery & Research
                <div className="border-b w-[45px] border-b-white" />
              </div>
              <div>
                For SeaSwap, a secure NFT swapping platform, the UI/UX needs
                primarily revolve around creating a seamless and user-friendly
                experience. This entails designing an intuitive interface that
                simplifies the complex processes associated with NFT trading,
                ensuring responsive design for both desktop and mobile users,
                and maintaining a cohesive visual identity with the chosen white
                and blue color scheme and subtle ocean wave accents.
                Additionally, user-centered design principles, clear navigation,
                and robust security features are crucial to meet the
                platform&apos;s objectives of simplicity, security, and user
                trust.
              </div>
            </div>
            <div className="flex flex-col gap-32 ">
              <div className="flex gap-12 justify-normal flex-col lg:flex-row items-center lg:items-start  lg:justify-between">
                <div className="max-w-sm">
                  <div className="font-bold mb-6">Logo Design</div>
                  <div>
                    The logo&apos;s elements were chosen to convey trust,
                    security, and forward movement, aligning with seaswap&apos;s
                    values. Ocean wave accents are tastefully integrated into
                    specific design elements, providing a cohesive and visually
                    pleasing identity that resonates with the platform&apos;s
                    theme without overwhelming the user interface.
                  </div>
                </div>
                <div className="border rounded-3xl border-white p-6">
                  <FadeInImage
                    src="/seaswap/logos.png"
                    alt="seaswap logo"
                    width={312}
                    height={84}
                  />
                </div>
              </div>
              <div className="flex gap-12 justify-normal flex-col lg:flex-row items-center lg:items-start  lg:justify-between">
                <div className="max-w-sm">
                  <div className="font-bold mb-6">Color Palette</div>
                  <div>
                    White is the predominant color, symbolizing transparency and
                    trust, reflecting SeaSwap&apos;s commitment to security. The
                    primary blue color represents reliability and calmness,
                    aligning with the platform&apos;s ocean-themed identity.
                  </div>
                </div>
                <div className="border rounded-3xl border-white p-6">
                  <FadeInImage
                    src="/seaswap/colors.png"
                    alt="seaswap color palette"
                    width={396}
                    height={60}
                  />
                </div>
              </div>
              <div className="flex gap-12 justify-normal flex-col lg:flex-row items-center lg:items-start  lg:justify-between">
                <div className="max-w-sm">
                  <div className="font-bold mb-6">Typography</div>
                  <div>
                    Chosen for its modern and clean aesthetic, Gilroy enhances
                    readability and adds a contemporary touch to the design. SF
                    Mono ensures a consistent presentation of vital information
                    within the platform.
                  </div>
                </div>
                <div className="border rounded-3xl border-white p-6">
                  <FadeInImage
                    src="/seaswap/types.png"
                    alt="seaswap typography"
                    width={705}
                    height={374}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ui design */}
          <div className="px-4 mb-32 flex flex-col lg:px-14 lg:mx-auto max-w-[1500px] items-center lg:items-start">
            <div className="max-w-md mb-32">
              <div className="font-bold uppercase flex flex-col mb-6">
                UI Design
                <div className="border-b w-[45px] border-b-white" />
              </div>
              <div>
                In conclusion, my role in the seaswap project focused on the
                UI/UX design for the homepage and documentation, which
                contributed to conveying seaswap&apos;s values while simplifying
                complex cryptocurrency processes for users.
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center w-full">
              <FadeInImage
                src="/seaswap/preview1.png"
                alt="seaswap typography"
                width={1600}
                height={961}
              />
              <FadeInImage
                src="/seaswap/preview2.png"
                alt="seaswap typography"
                width={1600}
                height={1125}
              />
              <FadeInImage
                src="/seaswap/preview3.png"
                alt="seaswap typography"
                width={1600}
                height={1250}
              />
              <FadeInImage
                src="/seaswap/preview4.png"
                alt="seaswap typography"
                width={1600}
                height={1622.5}
              />
              <FadeInImage
                src="/seaswap/preview5.png"
                alt="seaswap typography"
                width={1600}
                height={1207.5}
              />
              <FadeInImage
                src="/seaswap/preview6.png"
                alt="seaswap typography"
                width={1600}
                height={1348.33}
              />
              <FadeInImage
                src="/seaswap/preview7.png"
                alt="seaswap typography"
                width={1600}
                height={452.39}
              />
              <FadeInImage
                src="/seaswap/preview8.png"
                alt="seaswap typography"
                width={1600}
                height={957.98}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <Navbar />
    </>
  );
}
