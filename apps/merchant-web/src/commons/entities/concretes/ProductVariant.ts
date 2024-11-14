import { UUID } from "crypto";
import EntityBase from "../EntityBase";
import Product from "./Product";
import Image from "./Image";
import ProductAttribute from "./ProductAttribute";

export default class ProductVariant extends EntityBase {
  productId: UUID;
  imageId: UUID | null;
  priceAdjustment: number;
  stockQuantity: number;
  product: Product | null;
  image: Image | null;
  attributes: Array<ProductAttribute>;

  constructor(id: UUID, productId: UUID, imageId: UUID | null, priceAdjustment: number, stockQuantity: number, product: Product, image: Image, attributes: Array<ProductAttribute>) {
    super(id);
    this.productId = productId;
    this.imageId = imageId;
    this.priceAdjustment = priceAdjustment;
    this.stockQuantity = stockQuantity;
    this.product = product;
    this.image = image;
    this.attributes = attributes;
  }
}