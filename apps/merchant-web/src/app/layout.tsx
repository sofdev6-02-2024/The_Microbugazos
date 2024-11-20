"use client";

import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { OptionsProvider } from "@/commons/providers/add-product-provider";
import { VariantsProvider } from "@/commons/providers/variant-provider";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { ProductPopUpProvider } from "@/contexts/PopUpContext";
import { ProductPopUp } from "@/components/general/ProductPopUp";

const EXCLUDED_ROUTES = ["/login", "/signup"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: string | null = usePathname();
  const showComponents = !EXCLUDED_ROUTES.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <OptionsProvider>
          <VariantsProvider>
            <ProductPopUpProvider>
              <ProductPopUp />
              {showComponents && <Header />}
              <main>{children}</main>
              {showComponents && <Footer />}
            </ProductPopUpProvider>
          </VariantsProvider>
        </OptionsProvider>
      </body>
    </html>
  );
}
