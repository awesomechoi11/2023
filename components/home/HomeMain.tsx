"use client"; // This is a client component 👈🏽

import { RecoilRoot } from "recoil";
import About from "../sections/About";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Works from "../sections/Works";

export default function HomeMain() {
    return (
        <RecoilRoot>
            {/* <AssetLoader /> */}
            <div className="absolute top-0 h-full overflow-auto w-full">
                <main className="relative">
                    <Hero />
                    <About />
                    <Works />
                    <Footer />
                </main>
            </div>
        </RecoilRoot>
    );
}
