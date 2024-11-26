import Link from "next/link";
import "@/styles/payment/status-payment.css";
import { ReactNode } from "react";

interface PaymentStatusProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  children?: ReactNode;
}

export const PaymentStatus = ({
  title,
  description,
  imageSrc,
  altText,
  children,
}: PaymentStatusProps) => {
  return (
    <div className="payment-status-container">
      <div className="status-container">
        <div className="text-container-payment">
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
          <p>
            For Any Support Email:{" "}
            <a
              className="support-link"
              href="mailto:merchant.ecommerce.jala.support@gmail.com"
            >
              <b>merchant.ecommerce.jala.support@gmail.com</b>
            </a>
          </p>
          <div className="button-container">
            <Link href="/" className="status-btn">Back to HomePage</Link>
            {children}
          </div>
        </div>
        <img src={imageSrc} alt={altText} />
      </div>
    </div>
  );
};
