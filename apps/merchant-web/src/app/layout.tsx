"use client";

import { usePathname } from "next/navigation";
import { OptionsProvider } from "@/commons/providers/add-product-provider";
import { VariantsProvider } from "@/commons/providers/variant-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const EXCLUDED_ROUTES = ["/login", "/signup", "/create-store"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname: string | null = usePathname();
  const showComponents = !EXCLUDED_ROUTES.includes(pathname ?? "");

  return (
    <html lang="en">
      <OptionsProvider>
        <VariantsProvider>
          <body>
            {showComponents && <Header />}
            <main>{children}</main>
            {showComponents && <Footer />}
          </body>
        </VariantsProvider>
      </OptionsProvider>
    </html>
  );
}
