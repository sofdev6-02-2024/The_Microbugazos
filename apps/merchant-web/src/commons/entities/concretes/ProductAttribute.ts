import { UUID } from "crypto";

export default class ProductAttribute {
  productVariantAttributeId: UUID;
  name: string;
  value: string;

  constructor(productVariantAttributeId: UUID, name: UUID, value: string) {
    this.productVariantAttributeId = productVariantAttributeId;
    this.name = name;
    this.value = value;
  }
}