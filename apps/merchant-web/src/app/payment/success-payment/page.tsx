import {ThemeProvider} from "@/commons/context/ThemeContext";
import {PaymentSuccessful} from "@/components/payment-status/PaymentSuccessful";
import React from "react";

export default function FailedPaymentPage() {
  return (
    <ThemeProvider>
      <main>
        <PaymentSuccessful/>
      </main>
      <style>
        @import url(&#39;https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap&#39;);
      </style>
    </ThemeProvider>
  );
}