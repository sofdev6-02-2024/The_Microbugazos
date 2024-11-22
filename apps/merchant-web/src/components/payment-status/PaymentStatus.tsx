import React from "react";
import Link from "next/link";
import styles from "@/styles/payment/StatusPayment.module.css";

interface PaymentStatusProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  children?: React.ReactNode;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
                                                       title,
                                                       description,
                                                       imageSrc,
                                                       altText,
                                                       children,
                                                     }) => {

  return (
    <div className="container xl:h-screen xl:flex xl:justify-center xl:items-center">
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
      <style>
        @import url(&#39;https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap&#39;);
      </style>
    </div>
  );
};

export default PaymentStatus;
