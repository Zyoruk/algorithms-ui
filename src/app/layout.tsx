import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./shared/components/Header";
import Sidebar from "./shared/components/SideBar";
import Breadcrumbs from "./shared/components/Breadcrumbs";
import { NavProvider } from "./shared/context/NavContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algorithms UI",
  description: "Next.js app for visualizing algorithms",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="flex">
        <NavProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex min-h-screen flex-col p-10">
              <Breadcrumbs />
              {children}
            </main>
          </div>
        </NavProvider>
      </body>
    </html>
  );
}