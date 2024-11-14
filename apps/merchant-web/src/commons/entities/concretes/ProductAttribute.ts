import { UUID } from "crypto";
import EntityBase from "../EntityBase";
import ProductVariant from "./ProductVariant";
import Variant from "./Variant";

export default class ProductAttribute extends EntityBase {
  productVariantId: UUID;
  variantId: UUID;
  value: string;
  productVariant: ProductVariant | null;
  variant: Variant | null;

  constructor(id: UUID, productVariantId: UUID, variantId: UUID, value: string, productVariant: ProductVariant, variant: Variant) {
    super(id);
    this.productVariantId = productVariantId;
    this.variantId = variantId;
    this.value = value;
    this.productVariant = productVariant;
    this.variant = variant;
  }
}