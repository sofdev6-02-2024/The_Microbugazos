import { FC } from "react";
import { PaymentStatus } from "@/components/payment-status/PaymentStatus";

export const PaymentSuccessful: FC = () => {
  return (
    <div>
      <PaymentStatus
        title="Payment Successful!"
        description="Thank you for your payment! We're pleased to confirm that your transaction was successful. Your order has been processed, and you will receive an email confirmation shortly."
        imageSrc="https://res.cloudinary.com/dqowacw3b/image/upload/v1732238312/iadthfhdbtciipddfd1l.png"
        altText="Success Icon"
      />
    </div>
  );
};
