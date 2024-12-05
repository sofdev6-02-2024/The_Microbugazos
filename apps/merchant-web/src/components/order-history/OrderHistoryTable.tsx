import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import styles from "@/styles/order-history/OrderHistoryTable.module.css";
import {FC} from "react";
import {OrderHistoryPopUp} from "@/components/order-history/extra-details-pop-up/OrderHistoryPopUp";
import {OrderWithCompleteDetailsDto} from "@/schemes/order/OrderWithCompleteDetailsDto";
import {StatusChip} from "@/components/order-history/extra/StatusChipManager";

export const OrderHistoryTable: FC<{ currentOrders: OrderWithCompleteDetailsDto[] }> = ({ currentOrders }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className={styles["column"]}>Details</TableColumn>
        <TableColumn className={styles["column"]}>Nª</TableColumn>
        <TableColumn className={styles["column"]}>Date</TableColumn>
        <TableColumn className={styles["column"]}>Subtotal</TableColumn>
        <TableColumn className={styles["column"]}>Discount</TableColumn>
        <TableColumn className={styles["column"]}>Total</TableColumn>
        <TableColumn className={styles["column"]}>Status</TableColumn>
        <TableColumn className={styles["column"]}>Payment</TableColumn>
      </TableHeader>
      <TableBody className={styles["header"]}>
        {currentOrders.map((order) => (
          <TableRow key={order.orderNumber} className={styles[""]}>
            <TableCell><OrderHistoryPopUp order={order}/></TableCell>
            <TableCell>{order.orderNumber + 1}</TableCell>
            <TableCell>{formatDate(order.createdOrderDate)}</TableCell>
            <TableCell>{`$${order.subTotalPrice.toFixed(2)}`}</TableCell>
            <TableCell>{`${order.discount}%`}</TableCell>
            <TableCell>{`$${order.totalPrice.toFixed(2)}`}</TableCell>
            <TableCell><StatusChip status={order.orderStatus} type="order" /></TableCell>
            <TableCell><StatusChip status={order.paymentStatus} type="payment" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}