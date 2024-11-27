import { UUID } from "crypto";
import { ShoppingItemSelectedAttribute } from "../entities/ShoppingItemAttribute";

class ShoppingCartItem {
  id: string;
  productId: UUID;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  priceTotal: number;
  attributes: Array<ShoppingItemSelectedAttribute>;
  productVariantId: UUID;
  stock: number;

  constructor(
    id: UUID,
    imageUrl: string,
    name: string,
    quantity: number,
    price: number,
    priceTotal: number,
    attributes: Array<ShoppingItemSelectedAttribute>,
    productVariantId: UUID,
    productId: UUID,
    stock: number
  ) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.priceTotal = priceTotal;
    this.attributes = attributes;
    this.productVariantId = productVariantId;
    this.productId = productId;
    this.stock = stock;
    this.id = (() => {
      const attributesString = this.attributes
        .map((attribute) => `[${attribute.name}-${attribute.value}]`)
        .join("");

      return id + attributesString;
    })();
  }
}

export default ShoppingCartItem;
