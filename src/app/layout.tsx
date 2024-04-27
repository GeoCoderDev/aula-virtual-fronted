import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

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
      <body className={inter.className}>
        <Header />
        <div className="flex relative">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
