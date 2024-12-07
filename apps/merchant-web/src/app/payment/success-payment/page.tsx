"use client";

import { ThemeProvider } from "@/commons/context/ThemeContext";
import { PaymentSuccessful } from "@/components/payment-status/PaymentSuccessful";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import React, { useEffect } from "react";

export default function FailedPaymentPage() {
  const { handleSuccessPayment } = useShoppingCart();

  useEffect(() => {
    const executePayment = () => {
      try {
        handleSuccessPayment();
      } catch (error) {
        console.error("Error while handling success payment:", error);
      }
    };

    executePayment();
  }, []);

  return (
    <ThemeProvider>
      <main>
        <PaymentSuccessful />
      </main>
    </ThemeProvider>
  );
}
