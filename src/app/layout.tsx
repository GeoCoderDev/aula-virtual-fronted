import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import ProviderStore from "@/store/Provider";

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
          <div className="flex relative flex-1">
            <Sidebar />
            <main className="w-screen -border-2 flex items-center justify-center">{children}</main>
          </div>
        </ProviderStore>
      </body>
    </html>
  );
}
