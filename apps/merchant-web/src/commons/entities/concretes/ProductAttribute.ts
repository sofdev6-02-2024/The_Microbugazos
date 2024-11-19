import { UUID } from "crypto";
import EntityBase from "../EntityBase";

export default class ProductAttribute extends EntityBase {
  productVariantId: UUID;
  name: string;
  value: string;

  constructor(id: UUID, productVariantId: UUID, name: UUID, value: string) {
    super(id);
    this.productVariantId = productVariantId;
    this.name = name;
    this.value = value;
  }
}