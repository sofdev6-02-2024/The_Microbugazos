import { UUID } from "crypto";
import EntityBase from "../EntityBase";
import ProductVariant from "./ProductVariant";
import ProductReview from "./ProductReview";
import Category from "./Category";
import Image from "./Image";

export default class Product extends EntityBase {
  storeId: UUID | null;
  name: string;
  description: string;
  price: number;
  brand: string;
  images: Array<Image>;
  productVariants: Array<ProductVariant>;
  categories: Array<Category>;
  productReviews: Array<ProductReview>;

  constructor(id: UUID, storeId: UUID | null, name: string, description: string, price: number, brand: string, images: Array<Image>, productVariants: Array<ProductVariant>, categories: Array<Category>, productReviews: Array<ProductReview>) {
    super(id);
    this.storeId = storeId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.images = images;
    this.productVariants = productVariants;
    this.categories = categories;
    this.productReviews = productReviews;
  }
}