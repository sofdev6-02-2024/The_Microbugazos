import {ThemeProvider} from "@/commons/context/ThemeContext";
import React from "react";
import {FailedPayment} from "@/components/payment-status/PaymentFailed";

export default function FailedPaymentPage() {
  return (
    <ThemeProvider>
      <main>
        <FailedPayment/>
      </main>
      <style>
        @import url(&#39;https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap&#39;);
      </style>
    </ThemeProvider>
  );
}