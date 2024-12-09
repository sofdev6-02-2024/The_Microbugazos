import { UUID } from "crypto";
import ProductVariant from "./ProductVariant";
import Category from "./Category";
import Image from "./Image";
import {boolean} from "zod";


export default class Product {
  id: UUID;
  storeId: UUID;
  name: string;
  description: string;
  price: number;
  brand: string;
  isLiked: boolean;
  images: Array<Image>;
  rating: number;
  productVariants: Array<ProductVariant>;
  categories: Array<Category>;
  lowStockThreshold?: number;

  constructor(
    id: UUID,
    storeId: UUID,
    name: string,
    description: string,
    price: number,
    brand: string,
    isLiked: boolean,
    images: Array<Image>,
    rating: number,
    productVariants: Array<ProductVariant>,
    categories: Array<Category>,
    lowStockThreshold?: number
  ) {
    this.id = id;
    this.storeId = storeId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.isLiked = isLiked;
    this.brand = brand;
    this.categories = categories;
    this.images = images;
    this.rating = rating;
    this.productVariants = productVariants;
    this.categories = categories;
    this.lowStockThreshold = lowStockThreshold;
  }
}
