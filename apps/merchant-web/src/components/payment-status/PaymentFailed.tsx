import Link from "next/link";
import { PaymentStatus } from "@/components/payment-status/PaymentStatus";

export const FailedPayment = () => {
  return (
    <div>
      <PaymentStatus
        title="Something Went Wrong!"
        description="We apologize for the inconvenience, but an error occurred while processing your order request."
        imageSrc="https://res.cloudinary.com/dqowacw3b/image/upload/v1732242727/e79pqgxojgk01sdrqjye.png"
        altText="Failure Icon"
      >
        <Link href="/contact-us">Go to Contact Us</Link>
      </PaymentStatus>
    </div>
  );
};
