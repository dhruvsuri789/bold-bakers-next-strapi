import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import ReactQueryProvider from "./_components/ReactQueryProvider";
import Container from "./_components/Container";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";

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
  title: "Bold Baking",
  description: "Welcome to the recipes of Bold Bakers and become one of them!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body className="antialiased text-neutral-900 bg-red-50">
        <div className="w-full h-2 bg-red-600"></div>
        <ReactQueryProvider>
          <NuqsAdapter>
            <Container>
              <Nav />
              {children}
              <Footer />
            </Container>
          </NuqsAdapter>
        </ReactQueryProvider>
        <div className="w-full h-2 bg-red-600"></div>
      </body>
    </html>
  );
}
