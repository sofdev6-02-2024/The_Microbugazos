import Link from "next/link";
import styles from "@/styles/payment/StatusPayment.module.css";
import { FC, ReactNode } from "react";

interface PaymentStatusProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  children?: ReactNode;
}

export const PaymentStatus: FC<PaymentStatusProps> = ({
                                                       title,
                                                       description,
                                                       imageSrc,
                                                       altText,
                                                       children,
                                                     }) => {

  return (
    <div className="container">
      <div className={styles["sc-container"]}>
        <div className={styles["text-container_payment"]}>
          <label className={styles["title"]}>{title}</label>
          <p>{description}</p>
          <p>
            For Any Support Email:{" "}
            <a className={styles["support-link"]} href="mailto:merchant.ecommerce.jala.support@gmail.com">
              merchant.ecommerce.jala.support@gmail.com
            </a>
          </p>
          <div className={styles["button-container"]}>
            <Link href="/">
              <button
                className={styles["sc-btn"]}>
                Back to HomePage
              </button>
            </Link>
            {children && children}
          </div>
        </div>
        <img src={imageSrc} alt={altText}/>
      </div>
    </div>
  );
};
