import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

export const metadata: Metadata = {
  title: "BMSCHOI - 2023 Portfolio",
  description: "Front-End Developer Portfolio for 2023.",
  keywords: ["Next.js", "React", "JavaScript", "ThreeJS", "FramerMotion"],
  colorScheme: "dark",
  creator: "Brandon Choi",
  openGraph: {
    title: "BMSCHOI - 2023 Portfolio",
    description: "Front-End Developer Portfolio for 2023.",
    url: "https://bmschoi.dev/",
    siteName: "BMSCHOI",
    images: [
      {
        url: "/seo.png",
        width: 1050,
        height: 600,
      },
      {
        url: "/seaswapseo.png",
        width: 1050,
        height: 600,
      },
      {
        url: "/paymintseo.png",
        width: 1050,
        height: 600,
      },
      {
        url: "/igniteseo.png",
        width: 1050,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "black",
  twitter: {
    card: "summary_large_image",
    title: "BMSCHOI - 2023 Portfolio",
    description: "Front-End Developer Portfolio for 2023.",
    creator: "@bmschoidev",
    images: ["/seo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen overflow-hidden">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className="h-screen bg-black relative overflow-hidden">
        {children}
      </body>
    </html>
  );
}
