import {ThemeProvider} from "@/commons/context/ThemeContext";
import PaymentFailed from "@/components/payment-status/PaymentFailed";

export default function FailedPaymentPage() {
  return (
    <ThemeProvider>
      <main>
        <PaymentFailed />
      </main>
    </ThemeProvider>
  );
}