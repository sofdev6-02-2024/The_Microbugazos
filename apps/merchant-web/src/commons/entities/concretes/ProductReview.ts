import { UUID } from "crypto";
import EntityBase from "../EntityBase";
import Product from "./Product";

export default class ProductReview extends EntityBase {
  userId: UUID;
  productId: UUID;
  rating: number;
  comment: string;
  product: Product | null;

  constructor(id: UUID, userId: UUID, productId: UUID, rating: number, comment: string, product: Product) {
    super(id);
    this.userId = userId;
    this.productId = productId;
    this.rating = rating;
    this.comment = comment;
    this.product = product;
  }
}