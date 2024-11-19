"use client";

import localFont from "next/font/local";
import "./globals.css";
import { OptionsProvider } from "@/commons/providers/add-product-provider";
import { VariantsProvider } from "@/commons/providers/variant-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

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

const EXCLUDED_ROUTES = ["/login", "/signup"];
const EXCLUDED_PREFIXES = ["/stores"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showComponents =
    !EXCLUDED_ROUTES.includes(pathname) &&
    !EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  return (
    <html lang="en">
      <head>
        <title>Merchant</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
        <OptionsProvider>
          <VariantsProvider>
            <Toaster richColors />
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
              {showComponents && <Header />}
              <main>{children}</main>
              {showComponents && <Footer />}
            </body>
          </VariantsProvider>
        </OptionsProvider>{" "}
    </html>
  );
}
