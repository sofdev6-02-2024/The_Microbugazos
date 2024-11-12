"use client";

import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const EXCLUDED_ROUTES = ["/login", "/signup"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: string | null = usePathname();
  const showComponents = pathname !== null && !EXCLUDED_ROUTES.includes(pathname);

  return (
    <html lang="en">
      <body>
        {showComponents && <Header isRegistered={false} />}
        <main>{children}</main>
        {showComponents && <Footer />}
      </body>
    </html>
  );
}
