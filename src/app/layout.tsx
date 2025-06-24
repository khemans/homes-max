import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Home's Diary - Uncover its past stories",
  description: "Your friendly guide to permits, property rights, and peace of mind. Research property history with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="pt-0">
          {children}
        </main>
        <footer className="w-full bg-blue-900 text-white mt-16 py-8 px-4 text-center flex flex-col items-center gap-4">
          <div className="max-w-2xl mx-auto text-sm">
            <strong>Disclaimer:</strong> The information provided by Your Home&apos;s Diary is for educational and guidance purposes only. It is not legal advice. Always verify details with official sources and consult a legal professional for specific concerns.
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-2 text-blue-200 text-sm">
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
