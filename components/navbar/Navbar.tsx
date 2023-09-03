import Link from "next/link";
import Button from "../Button";

export default function Navbar() {
    return (
        <div className="bg-transparent pointer-events-none w-full pt-[45px] pb-[25px] flex justify-between px-[140px] text-[16px] font-bold absolute top-0">
            <div className="pointer-events-auto">
                <Link href="/" className="text-[20px] font-bold">
                    bmschoi
                </Link>
            </div>
            <div className="flex gap-[12px] pointer-events-auto">
                <Button themeType="transparent">
                    <Link href="/">About</Link>
                </Button>
                <Button themeType="transparent">
                    <Link href="/">Works</Link>
                </Button>
                <Button>
                    <Link href="/">Contact</Link>
                </Button>
            </div>
        </div>
    );
}
