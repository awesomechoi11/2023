import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

export const metadata: Metadata = {
  title: "bmschoi - front end developer - portfolio",
  description: "bmschoi - portfolio - 2023",
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
        <meta
          name="description"
          content="bmschoi - portfolio - 2023"
          key="desc"
        />
        <meta property="og:title" content="bmschoi - portfolio - 2023" />
        <meta property="og:description" content="front end developer" />
        <meta property="og:image" content="/seo.png" />
        <meta property="twitter:image" content="/seo.png"></meta>
        <meta property="twitter:card" content="/seo.png"></meta>
        <meta
          property="twitter:title"
          content="bmschoi - portfolio - 2023"
        ></meta>
        <meta
          property="twitter:description"
          content="front end developer"
        ></meta>
      </Head>
      <body className="h-screen bg-black relative overflow-hidden">
        {children}
      </body>
    </html>
  );
}
