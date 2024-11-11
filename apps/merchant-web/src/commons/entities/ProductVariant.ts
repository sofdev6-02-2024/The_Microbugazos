class ProductVariant {

  name: string;
  attribute: string;
  quantity: number;
  price: number;

  constructor(name: string, attribute: string, quantity: number, price: number) {
    this.name = name;
    this.attribute = attribute;
    this.quantity = quantity;
    this.price = price;
  }
}

export default ProductVariant;