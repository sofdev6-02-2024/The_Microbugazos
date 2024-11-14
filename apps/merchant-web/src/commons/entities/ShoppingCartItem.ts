import { UUID } from "crypto";
import ProductVariant from "./concretes/ProductVariant";

class ShoppingCartItem {
  id: UUID;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  variants: Map<string, ProductVariant>;

  constructor(id: UUID, imageUrl: string, name: string, quantity: number, price: number, variants: Map<string, ProductVariant>) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.variants = variants;
  }
}

export default ShoppingCartItem;