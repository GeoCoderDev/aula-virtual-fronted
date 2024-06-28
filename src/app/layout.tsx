
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import ProviderStore from "@/store/Provider";
import WrapperMainContent from "@/components/shared/WrapperMainContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aula Virtual JBS",
  description: "Aula virtual para el colegio Jose Buenaventura Sepulveda",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/svg/Logo Colegio.svg"
          type="image/x-icon"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-[100svh]`}>
        <ProviderStore>
          <Header />
          <div className="top-0 flex relative">
            <Sidebar />
            <main className="flex-1 flex items-center justify-center">
              <WrapperMainContent>{children}</WrapperMainContent>
            </main>
          </div>
        </ProviderStore>
      </body>
    </html>
  );
}
