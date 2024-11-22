import { UUID } from "crypto";
import ProductVariant from "./ProductVariant";
import Category from "./Category";
import Image from "./Image";

export default class Product {
  productId: UUID;
  name: string;
  description: string;
  price: number;
  brand: string;
  categories: Array<Category>;
  images: Array<Image>;
  productVariants: Array<ProductVariant>;

  constructor(
    productId: UUID,
    name: string,
    description: string,
    price: number,
    brand: string,
    categories: Array<Category>,
    images: Array<Image>,
    productVariants: Array<ProductVariant>
  ) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.categories = categories;
    this.images = images;
    this.productVariants = productVariants;
  }
}
