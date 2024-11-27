"use client";

import "./globals.css";
import { Header } from "@/components/Header";
import { OptionsProvider } from "@/commons/providers/add-product-provider";
import { VariantsProvider } from "@/commons/providers/variant-provider";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/commons/context/AuthContext";
import { ModalProvider } from "@/commons/context/ModalContext";
import { Modal } from "@/components/Modal";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";

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
      <body className="body" suppressHydrationWarning>
        <NextUIProvider>
          <Toaster richColors />
          <AuthProvider>
            <OptionsProvider>
              <VariantsProvider>
                <ShoppingCartProvider>
                  <ModalProvider>
                    {showComponents && <Header />}
                    <main>{children}</main>
                    {showComponents && <Footer />}
                    <Modal />
                  </ModalProvider>
                </ShoppingCartProvider>
              </VariantsProvider>
            </OptionsProvider>
          </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
