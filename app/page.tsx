import HeroBox from "@/components/hero/HeroBox";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import ScreenBlock from "@/components/dev_helpers/ScreenBlock";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="overflow-auto h-screen">
                <div className="mt-[268px] ml-[148px]">
                    <div className="font-bold text-[80px] mb-5">
                        <div className="flex items-center gap-5">
                            Creating <HeroBox />
                            interactive
                        </div>
                        <div>experiences for the web.</div>
                    </div>
                    <div className="text-[24px]">
                        Based in <span className="font-bold">Los Angeles</span>
                    </div>
                </div>
                <ScreenBlock />
                hello
            </main>
        </>
    );
}
