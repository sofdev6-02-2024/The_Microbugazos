import styles from "@/styles/order-history/OrderHistoryPopUp.module.css";
import {OrderItemWithCompletedDetailsDto} from "@/schemes/order/OrderItemWithCompletedDetailsDto";
import {FC} from "react";
import {InformationRow} from "@/components/order-history/extra-details-pop-up/InformationRow";

export const OrderHistoryCard: FC<{ orderItem: OrderItemWithCompletedDetailsDto }> = ({ orderItem }) => {
  const {
    productName,
    brand,
    basePrice,
    orderItemVariant: { quantity, unitPrice, discountPercent, subTotalPrice },
  } = orderItem;
  return (
    <div className={styles["main-container"]}>
      <div className={styles["image-container"]}>
        <img src={orderItem.imageUrl} alt="Product Image" width={"50px"}/>
      </div>
      <h1>Basic Information: </h1>
      <div>
        <InformationRow label="Product Name" value={productName}/>
        <InformationRow label="Brand" value={brand}/>
        <InformationRow label="Base Price" value={basePrice} isCurrency/>
      </div>
      <h1>Extra Information: </h1>
      <div>
        <InformationRow label="Quantity" value={quantity}/>
        <InformationRow label="Unit Price" value={unitPrice} isCurrency/>
        <InformationRow label="Discount" value={discountPercent} isPercentage/>
        <InformationRow label="SubTotal" value={subTotalPrice} isCurrency/>
      </div>
    </div>
  )
}