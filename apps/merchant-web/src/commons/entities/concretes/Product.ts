import { UUID } from "crypto";
import ProductVariant from "./ProductVariant";
import Category from "./Category";
import Image from "./Image";
import ProductReview from "./ProductReview";

export default class Product {
  id: UUID;
  storeId: UUID;
  name: string;
  description: string;
  price: number;
  brand: string;
  images: Array<Image>;
  productVariants: Array<ProductVariant>;
  categories: Array<Category>;
  productReviews: Array<ProductReview>;

  constructor(
    id: UUID,
    storeId: UUID,
    name: string,
    description: string,
    price: number,
    brand: string,
    images: Array<Image>,
    productVariants: Array<ProductVariant>,
    categories: Array<Category>,
    productReviews: Array<ProductReview>
  ) {
    this.id = id;
    this.storeId = storeId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.categories = categories;
    this.images = images;
    this.productVariants = productVariants;
    this.productReviews = productReviews;
    this.categories = categories;
  }
}
