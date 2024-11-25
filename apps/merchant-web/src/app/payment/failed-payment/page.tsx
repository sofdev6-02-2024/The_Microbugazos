import {ThemeProvider} from "@/commons/context/ThemeContext";
import React from "react";
import {FailedPayment} from "@/components/payment-status/PaymentFailed";

export default function FailedPaymentPage() {
  return (
    <ThemeProvider>
      <main>
        <FailedPayment/>
      </main>
    </ThemeProvider>
  );
}