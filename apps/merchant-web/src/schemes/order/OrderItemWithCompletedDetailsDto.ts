import {OrderItemVariantDto} from "@/schemes/order/OrderItemVariantDto";

export class OrderItemWithCompletedDetailsDto {
  productName: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
  orderItemVariant: OrderItemVariantDto;

  constructor(
    productName: string,
    brand: string,
    imageUrl: string,
    basePrice: number,
    orderItemVariant: OrderItemVariantDto
  ) {
    this.productName = productName;
    this.brand = brand;
    this.imageUrl = imageUrl;
    this.basePrice = basePrice;
    this.orderItemVariant = orderItemVariant;
  }
}