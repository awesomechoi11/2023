import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    paddingType?: keyof ButtonPaddingVariantTypes;
    themeType?: keyof ButtonThemeVariantTypes;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    themeType = "light",
    paddingType = "asym",
}) => {
    return (
        <button
            className={twMerge(
                className,
                ButtonPaddingVariants[paddingType],
                ButtonThemeVariants[themeType],
                " mix-blend-difference  rounded-full"
            )}
        >
            {children}
        </button>
    );
};

type ButtonPaddingVariantTypes = { asym: string; sym: string };
const ButtonPaddingVariants: ButtonPaddingVariantTypes = {
    asym: "px-8 py-4",
    sym: "px-4 py-4",
};

type ButtonThemeVariantTypes = {
    light: string;
    transparent: string;
};
const ButtonThemeVariants: ButtonThemeVariantTypes = {
    light: "bg-white text-black",
    transparent: "bg-transparent text-white",
};

export default Button;
