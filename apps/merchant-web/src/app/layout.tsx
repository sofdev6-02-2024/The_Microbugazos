"use client";

import "./globals.css";
import { Header } from "@/components/Header";
import { OptionsProvider } from "@/commons/providers/add-product-provider";
import { VariantsProvider } from "@/commons/providers/variant-provider";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { ProductPopUpProvider } from "@/commons/context/PopUpContext";
import { ProductPopUp } from "@/components/general/ProductPopUp";
import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/commons/context/AuthContext";

const EXCLUDED_ROUTES = ["/login", "/signup", "/create-store"];
const EXCLUDED_PREFIXES = ["/store"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: string | null = usePathname();
  const showComponents =
    pathname !== null &&
    !EXCLUDED_ROUTES.includes(pathname) &&
    !EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
      <NextUIProvider>
        <Toaster richColors />
        <AuthProvider>
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
        </AuthProvider>
      </NextUIProvider>
      </body>
    </html>
  );
}
