'use client'

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const EXCLUDED_ROUTES = ['/login', '/signup', '/create-store'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showComponents = !EXCLUDED_ROUTES.includes(pathname);

  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {showComponents && <Header/>}
        <main>
          {children}
        </main>
        {showComponents && <Footer/>}
      </body>
    </html>
  );
}
