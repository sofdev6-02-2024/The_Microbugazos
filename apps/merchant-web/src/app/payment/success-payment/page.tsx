import {ThemeProvider} from "@/commons/context/ThemeContext";
import PaymentSuccessful from "@/components/payment-status/PaymentSuccessful";

export default function FailedPaymentPage() {
  return (
    <ThemeProvider>
      <main>
        <PaymentSuccessful />
      </main>
    </ThemeProvider>
  );
}