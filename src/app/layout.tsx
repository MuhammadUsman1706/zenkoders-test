import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navigation/Navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenBulletin",
  description: "Zenkoders test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
