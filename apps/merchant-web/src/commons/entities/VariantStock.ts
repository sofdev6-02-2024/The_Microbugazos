import { UUID } from "crypto"

export default class VariantStock {
  variantId: UUID;
  quantity: number;

  constructor(variantId: UUID, quantity: number) {
    this.variantId = variantId;
    this.quantity = quantity;
  }
}