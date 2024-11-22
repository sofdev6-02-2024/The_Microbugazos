import Link from "next/link";
import styles from "@/styles/payment/StatusPayment.module.css";
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
    <div className="container">
      <div className={styles["sc-container"]}>
        <div className={styles["text-container_payment"]}>
          <label className={styles["title"]}>{title}</label>
          <p>{description}</p>
          <p>
            For Any Support Email:{" "}
            <a
              className={styles["support-link"]}
              href="mailto:merchant.ecommerce.jala.support@gmail.com"
            >
              merchant.ecommerce.jala.support@gmail.com
            </a>
          </p>
          <div className={styles["button-container"]}>
            <Link href="/">Back to HomePage</Link>
            {children}
          </div>
        </div>
        <img src={imageSrc} alt={altText} />
      </div>
    </div>
  );
};
