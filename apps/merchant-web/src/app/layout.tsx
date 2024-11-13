"use client";

import "./globals.css";
import { Header } from "@/components/Header";
import { OptionsProvider } from "@/commons/providers/add-product-provider";
import { VariantsProvider } from "@/commons/providers/variant-provider";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const EXCLUDED_ROUTES = ["/login", "/signup", "/create-store"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: string | null = usePathname();
  const showComponents =
    pathname !== null && !EXCLUDED_ROUTES.includes(pathname);

  return (
    <html lang="en">
      <body>
        <OptionsProvider>
          <VariantsProvider>
            {showComponents && <Header />}
            <main>{children}</main>
            {showComponents && <Footer />}
          </VariantsProvider>
        </OptionsProvider>
      </body>
    </html>
  );
}
