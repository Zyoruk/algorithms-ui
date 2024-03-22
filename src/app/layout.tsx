import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./shared/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algorithms UI",
  description: "Next.js app for visualizing algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}