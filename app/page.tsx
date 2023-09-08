import Button from "@/components/Button";
import ScreenBlock from "@/components/dev_helpers/ScreenBlock";
import Navbar from "@/components/navbar/Navbar";
import { email_svg, github_svg, linkedin_svg } from "@/components/svg/socials";
import MainCanvas from "@/components/three/MainCanvas";

export default function Home() {
    return (
        <>
            <Navbar />
            <MainCanvas />
            <main className="overflow-auto h-screen">
                <div className="mt-[268px] ml-[148px] mr-[100px]">
                    <div className="font-bold text-[80px] mb-5">
                        <div className="flex items-center gap-5">
                            Creating
                            {/* <HeroBox /> */}
                            interactive
                        </div>
                        <div>experiences for the web.</div>
                    </div>
                    <div className="text-[24px] mb-[200px]">
                        Based in <span className="font-bold">Los Angeles</span>
                    </div>
                    <div className="flex justify-between items-end mb-24">
                        <div className="flex gap-6">
                            <Button paddingType="sym" themeType="light">
                                {github_svg}
                            </Button>
                            <Button paddingType="sym" themeType="light">
                                {linkedin_svg}
                            </Button>
                            <Button paddingType="sym" themeType="light">
                                {email_svg}
                            </Button>
                        </div>
                        <div>
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
                        </div>
                    </div>
                </div>
                <div className="pl-36 pr-64 py-36 flex justify-between bg-white text-black">
                    <div className="w-[948px] ">
                        <div className="font-bold text-xl mb-6">About Me</div>
                        <div className="text-[58px]">
                            I believe storytelling creates meaningful & lasting
                            connections
                        </div>
                    </div>
                    <div className="w-[415px]">
                        <div className="mb-16">
                            <div className="font-bold text-xl mb-4">
                                Development
                            </div>
                            <div>
                                With my technical knowledge and passion for
                                motion and interaction, I am able to develop a
                                versatile and lasting codebase. In my code, I
                                make sure to express my passions to its fullest
                                extent.
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-xl mb-4">Design</div>
                            <div>
                                I always strive to create meaningful experiences
                                for users that combine multidisciplinary fields.
                                To connect people with aesthetically pleasing,
                                highly functional, accessible experiences.{" "}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-600 h-56"></div>
                <ScreenBlock />
                hello
            </main>
        </>
    );
}
