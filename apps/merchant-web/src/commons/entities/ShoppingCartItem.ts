import { UUID } from "crypto";
import { ShoppingItemSelectedAttribute } from "./ShoppingItemAttribute";

class ShoppingCartItem {
  id: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  attributes: Array<ShoppingItemSelectedAttribute>;
  productVariantId: UUID;

  constructor(
    id: UUID,
    imageUrl: string,
    name: string,
    quantity: number,
    price: number,
    attributes: Array<ShoppingItemSelectedAttribute>,
    productVariantId: UUID
  ) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.attributes = attributes;
    this.productVariantId = productVariantId;
    this.id = this.generateId(id);
  }

  generateId(id: UUID) {
    const attributesString = this.attributes
      .map((attribute) => `[${attribute.name}-${attribute.value}]`)
      .join("");

    return id + attributesString;
  }
}

export default ShoppingCartItem;
