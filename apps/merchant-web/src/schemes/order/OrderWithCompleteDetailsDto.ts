import {OrderItemWithCompletedDetailsDto} from "@/schemes/order/OrderItemWithCompletedDetailsDto";

export class OrderWithCompleteDetailsDto {
  orderNumber: number;
  orderStatus: string;
  paymentStatus: string;
  createdOrderDate: string;
  subTotalPrice: number;
  discount: number;
  totalPrice: number;
  orderItems: OrderItemWithCompletedDetailsDto[];

  constructor(
    orderNumber: number,
    orderStatus: string,
    paymentStatus: string,
    createdOrderDate: string,
    subTotalPrice: number,
    discount: number,
    totalPrice: number,
    orderItems: OrderItemWithCompletedDetailsDto[]
  ) {
    this.orderNumber = orderNumber;
    this.orderStatus = orderStatus;
    this.paymentStatus = paymentStatus;
    this.createdOrderDate = createdOrderDate;
    this.subTotalPrice = subTotalPrice;
    this.discount = discount;
    this.totalPrice = totalPrice;
    this.orderItems = orderItems;
  }
}