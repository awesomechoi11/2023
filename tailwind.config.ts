import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            extend: {
                colors: {
                    black: "#101010", // override default black color
                    white: "#F2F2F2",
                },
            },
            fontFamily: {
                sans: ["Gilroy", "sans-serif"], // Making Gilroy the default sans-serif font
                gilroy: ["Gilroy", "sans-serif"], // Additional definition to allow explicit use if needed
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
