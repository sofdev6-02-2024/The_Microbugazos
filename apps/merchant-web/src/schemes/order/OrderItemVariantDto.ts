export class OrderItemVariantDto {
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  subTotalPrice: number;

  constructor(
    quantity: number,
    unitPrice: number,
    discountPercent: number,
    subTotalPrice: number
  ) {
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.discountPercent = discountPercent;
    this.subTotalPrice = subTotalPrice;
  }
}