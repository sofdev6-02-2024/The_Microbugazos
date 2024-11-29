"use client";

import styles from "@/styles/order-history/OrderHistory.module.css";
import React from "react";
import {OrderHistoryInformationComponent} from "@/components/order-history/OrderHistoryInformationComponent";

export const OrderHistoryComponent = () => {

  return (
    <div>
      <div className="container">
        <h1 className={styles["title"]}>Order History</h1>
        <OrderHistoryInformationComponent/>
        <div className={styles["sc-container"]}>

        </div>
      </div>
    </div>
  )
}