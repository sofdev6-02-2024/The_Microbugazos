import { UUID } from "crypto";
import Image from "./Image";
import ProductAttribute from "./ProductAttribute";

export default class ProductVariant {
  productVariantId: UUID;
  productId: UUID;
  productVariantImage: Image;
  priceAdjustment: number;
  stockQuantity: number;
  attributes: Array<ProductAttribute>;

  constructor(
    productVariantId: UUID,
    productId: UUID,
    productVariantImage: Image,
    priceAdjustment: number,
    stockQuantity: number,
    attributes: Array<ProductAttribute>
  ) {
    this.productVariantId = productVariantId;
    this.productId = productId;
    this.productVariantImage = productVariantImage;
    this.priceAdjustment = priceAdjustment;
    this.stockQuantity = stockQuantity;
    this.attributes = attributes;
  }
}
