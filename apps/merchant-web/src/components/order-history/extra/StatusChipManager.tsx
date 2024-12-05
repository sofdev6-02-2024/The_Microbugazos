import { Chip } from "@nextui-org/react";
import { FC } from "react";
import styles from "@/styles/order-history/OrderHistoryTable.module.css";

interface StatusChipProps {
  status: string;
  type: "payment" | "order";
}

export const StatusChip: FC<StatusChipProps> = ({ status, type }) => {
  const getStatusChip = (status: string, type: "payment" | "order") => {
    const normalizedStatus = status ? status.toLowerCase() : "unknown";

    if (type === "payment") {
      switch (normalizedStatus) {
        case "paid":
          return <Chip className={styles["chip"]} color="success">Paid</Chip>;
        case "unpaid":
          return <Chip className={styles["chip"]} color="warning">Unpaid</Chip>;
        default:
          return <Chip className={styles["chip"]} color="default">Unknown</Chip>;
      }
    }

    if (type === "order") {
      switch (normalizedStatus) {
        case "pending":
          return <Chip className={styles["chip"]} color="warning">Pending</Chip>;
        case "confirmed":
          return <Chip className={styles["chip"]} color="primary">Confirmed</Chip>;
        case "shipped":
          return <Chip className={styles["chip"]} color="secondary">Shipped</Chip>;
        case "delivered":
          return <Chip className={styles["chip"]} color="success">Delivered</Chip>;
        case "cancelled":
          return <Chip className={styles["chip"]} color="danger">Cancelled</Chip>;
        case "returned":
          return <Chip className={styles["chip"]} color="default">Returned</Chip>;
        default:
          return <Chip className={styles["chip"]} color="default">Unknown</Chip>;
      }
    }

    return <Chip className={styles["chip"]} color="default">Unknown</Chip>;
  };

  return <>{getStatusChip(status, type)}</>;
};
