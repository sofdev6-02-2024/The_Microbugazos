"use client";

import "./globals.css";
import { Header } from "@/components/Header";
import { OptionsProvider } from "@/commons/providers/add-product-provider";
import { VariantsProvider } from "@/commons/providers/variant-provider";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { AuthProvider } from "@/commons/context/AuthContext";
import { ModalProvider } from "@/commons/context/ModalContext";
import { Modal } from "@/components/Modal";

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
        <Toaster richColors />
        <AuthProvider>
          <OptionsProvider>
            <VariantsProvider>
              <ModalProvider>
                {showComponents && <Header />}
                <main>{children}</main>
                {showComponents && <Footer />}
                <Modal />
              </ModalProvider>
            </VariantsProvider>
          </OptionsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
