import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import styles from "@/styles/order-history/OrderHistoryPopUp.module.css";
import {LuInfo} from "react-icons/lu";
import React, {FC} from "react";
import {OrderWithCompleteDetailsDto} from "@/schemes/order/OrderWithCompleteDetailsDto";
import {OrderHistoryCard} from "@/components/order-history/extra-details-pop-up/OrderHistoryCard";

export const OrderHistoryPopUp: FC<{ order: OrderWithCompleteDetailsDto }> = ({order}) => {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button className={styles["display-information-button"]} size="sm">
          <LuInfo/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles["container"]}>
        <div className={styles["sc-container"]}>
          <span>Order Items Details:</span>
          {order.orderItems.map((item) => (
            <OrderHistoryCard orderItem={item} key={item.productName + item.orderItemVariant.unitPrice}/>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}