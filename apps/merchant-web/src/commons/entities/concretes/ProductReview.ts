import { UUID } from "crypto";
import Product from "./Product";

export default class ProductReview {
  id: UUID;
  userId: UUID;
  productId: UUID;
  rating: number;
  comment: string;
  product: Product | null;

  constructor(id: UUID, userId: UUID, productId: UUID, rating: number, comment: string, product: Product) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.rating = rating;
    this.comment = comment;
    this.product = product;
  }
}