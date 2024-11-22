import PaymentStatus from "./PaymentStatus";
import Link from "next/link";
import styles from "@/styles/payment/StatusPayment.module.css";

const FailedPayment: React.FC = () => {
  return (
    <div>
      <PaymentStatus
        title="Something Went Wrong!"
        description="We apologize for the inconvenience, but an error occurred while processing your order request."
        imageSrc="https://res.cloudinary.com/dqowacw3b/image/upload/v1732242727/e79pqgxojgk01sdrqjye.png"
        altText="Failure Icon"
      >
        <Link href="/contact-us">
          <button className={styles["sc-btn"]}>
            Go to Contact Us
          </button>
        </Link>
      </PaymentStatus>
    </div>
  );
};

export default FailedPayment;
