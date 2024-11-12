import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Merchant - Ecommerce",
  description: "Merchant is a ecommerce for all customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header isRegistered={false} />
        {children}
      </body>
    </html>
  );
}
