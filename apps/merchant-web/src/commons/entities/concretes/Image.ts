import { UUID } from "crypto";
import EntityBase from "../EntityBase";
import Product from "./Product";
import ProductVariant from "./ProductVariant";

export default class Image extends EntityBase {
  productId: UUID | null;
  altText: string;
  url: string;
  product: Product | null;
  productVariant: ProductVariant | null;

  constructor(id: UUID, productId: UUID | null, altText: string, url: string, product: Product, productVariant: ProductVariant) {
    super(id);
    this.productId = productId;
    this.altText = altText;
    this.url = url;
    this.product = product;
    this.productVariant = productVariant;
  }
}