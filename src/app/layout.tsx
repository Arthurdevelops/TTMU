import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TTMU - Turn The Music Up",
  description: "Handle msic by hands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${outfit.variable}  antialiased`}>{children}</body>
    </html>
  );
}
