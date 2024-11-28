import styles from "@/styles/contact-us/ContactUs.module.css";
import ContactUsForm from "@/components/contact-us/ContactUsForm";
import React from "react";

export const ContactUsContainer = () => {
  return (
    <div>
      <div className="container">
        <h1 className={styles["title"]}>Contact Us</h1>
        <div className={styles["sc-container"]}>
          <div className={styles["text-container-contact"]}>
            <ContactUsForm/>
          </div>
          <img src="https://res.cloudinary.com/playhardimages/image/upload/v1732761930/dbqdnx0h0hw3xejr19ee.png"
               alt="robot-contact-us"/>
        </div>
      </div>
    </div>
  );
}