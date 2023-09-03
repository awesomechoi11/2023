import { twMerge } from "tailwind-merge";
import React, { ReactNode } from "react";

interface ScreenBlockProps {
    children?: ReactNode;
    className?: string;
}

const ScreenBlock: React.FC<ScreenBlockProps> = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                className,
                "h-screen w-full bg-white flex justify-center items-center"
            )}
        >
            {children || (
                <span className="mix-blend-difference">Screen Block</span>
            )}
        </div>
    );
};

export default ScreenBlock;
