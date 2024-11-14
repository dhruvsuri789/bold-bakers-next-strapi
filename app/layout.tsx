import type { Metadata } from "next";
import "./globals.css";
import { Lora, Inter } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bold Bakers",
  description: "Welcome to the recipes of Bold Bakers and become one of them!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body className="antialiased text-neutral-900 bg-red-100">
        {children}
      </body>
    </html>
  );
}
