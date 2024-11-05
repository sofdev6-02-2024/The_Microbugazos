'use client'

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import {usePathname} from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeader = pathname !== "/login" && pathname !== "/signup";

  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {showHeader && <Header/>}
        {children}
      </body>
    </html>
  );
}
