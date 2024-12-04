import React, { FC } from 'react';
import { Pagination, CircularProgress } from "@nextui-org/react";
import styles from "@/styles/order-history/OrderHistoryTable.module.css";
import { OrderHistoryTable } from "@/components/order-history/OrderHistoryTable";
import { OrderWithCompleteDetailsDto } from "@/schemes/order/OrderWithCompleteDetailsDto";
import { PaginatedResponseDto } from "@/schemes/PaginatedResponseDto";
import {Filter} from "@/hooks/useOrderFilter";

export const OrderHistoryContainer: FC<{
  paginatedOrderResponse: PaginatedResponseDto<OrderWithCompleteDetailsDto> | undefined,
  orderFilter: Filter}> = ({ paginatedOrderResponse, orderFilter }) => {
  if (!paginatedOrderResponse) {
    return (
      <div className={styles["order-charging-container"]}>
        <CircularProgress size="lg" label="Loading Orders..."/>
      </div>
    );
  }
  const totalPages = Math.ceil(paginatedOrderResponse.totalCount / 10);
  const currentOrders = paginatedOrderResponse.items;

  if (!currentOrders || currentOrders.length === 0) {
    return (
      <div className={styles["order-charging-container"]}>
        <label>There is no any order to display in your history</label>
      </div>
    );
  }

  return (
    <div className={styles[""]}>
      <OrderHistoryTable currentOrders={currentOrders} />
      <div className={styles["paginated-container"]}>
        <Pagination
          showControls
          showShadow
          variant="bordered"
          classNames={{
            wrapper: styles.paginationWrapper,
            item: styles.paginationItem,
            cursor: styles.paginationCursor,
            next: styles.paginationNext,
            prev: styles.paginationPrev
          }}
          total={totalPages}
          page={orderFilter.getPage()}
          onChange={(page) => orderFilter.updatePage(page)}
        />
      </div>
    </div>
  );
};

export default OrderHistoryContainer;
