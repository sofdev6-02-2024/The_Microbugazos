"use client"

import { ThemeProvider } from "@/commons/context/ThemeContext";
import { PaymentSuccessful } from "@/components/payment-status/PaymentSuccessful";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import React, { useEffect } from "react";

export default function FailedPaymentPage() {
  const { clearShoppingCart, handleSuccessPayment } = useShoppingCart();

  useEffect(() => {
    handleSuccessPayment();
    clearShoppingCart();
  }, []);

  return (
    <ThemeProvider>
      <main>
        <PaymentSuccessful />
      </main>
    </ThemeProvider>
  );
}
