"use client";

import styles from "@/styles/order-history/OrderHistory.module.css";
import {useFilter} from "@/commons/hooks/useOrderFilter";
import {DateFilterPopUp} from "@/components/order-history/pop-ups-filters/DateFilterPopUp";
import {PriceFilterPopUp} from "@/components/order-history/pop-ups-filters/PriceFilterPopUp";
import {StatusFilterPopUp} from "@/components/order-history/pop-ups-filters/StatusFilterPopUp";
import {OrderHistoryContainer} from "@/components/order-history/OrderHistoryContainer";
import {useEffect, useState} from "react";
import {getOrdersByUser} from "@/services/orderService";
import {PaginatedResponseDto} from "@/schemes/PaginatedResponseDto";
import {OrderWithCompleteDetailsDto} from "@/schemes/order/OrderWithCompleteDetailsDto";
import useAuth from "@/hooks/useAuth";

export const OrderHistoryComponent = () => {
  const { user } = useAuth();
  const orderFilter = useFilter();
  const [paginatedResponse, setPaginatedResponse] = useState<PaginatedResponseDto<OrderWithCompleteDetailsDto>>();

  const handleFetchOrders = async () => {
    if (!user?.userId) return;
    try {
      const response = await getOrdersByUser(user.userId, orderFilter);
      setPaginatedResponse(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchOrders();
  }, [user?.userId, orderFilter.getPage()]);
    return (
        <div>
            <div className={styles["container"]}>
              <h1 className={styles["title"]}>Your Orders</h1>
              <hr className={styles["line"]} />
              <div className={styles["filters-section"]}>
                <DateFilterPopUp
                  selectedStartDate={orderFilter.getStartDate()}
                  selectedEndDate={orderFilter.getEndDate()}
                  setSelectedStartDate={orderFilter.updateStartDate.bind(orderFilter)}
                  setSelectedEndDate={orderFilter.updateEndDate.bind(orderFilter)}
                  setPageToDefault={orderFilter.updatePage.bind(orderFilter)}
                  applyFilters={handleFetchOrders}
                />
                <PriceFilterPopUp
                  selectedStartPrice={orderFilter.getMinPrice()}
                  selectedEndPrice={orderFilter.getMaxPrice()}
                  setSelectedStartPrice={orderFilter.updateMinPrice.bind(orderFilter)}
                  setSelectedEndPrice={orderFilter.updateMaxPrice.bind(orderFilter)}
                  setPageToDefault={orderFilter.updatePage.bind(orderFilter)}
                  applyFilters={handleFetchOrders}
                />
                <StatusFilterPopUp
                  setSelectedStatus={orderFilter.updateOrderStatus.bind(orderFilter)}
                  setPageToDefault={orderFilter.updatePage.bind(orderFilter)}
                  applyFilters={handleFetchOrders}
                />
              </div>
              <OrderHistoryContainer orderFilter={orderFilter} paginatedOrderResponse={paginatedResponse}/>
            </div>
        </div>
    );
};
