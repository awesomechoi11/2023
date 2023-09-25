import HomeMain from "@/components/home/HomeMain";
import Navbar from "@/components/navbar/Navbar";
import MainCanvas from "@/components/three/MainCanvas";

export default function Home() {
  return (
    <>
      <main>
        {/* WIP banner */}

        <div className="flex flex-col gap-3 text-black bg-white py-5">
          <div className="font-bold ">Work In Progress</div>
          <div>Comprehensive case study coming soon</div>
        </div>
      </main>
      <Navbar />
    </>
  );
}
