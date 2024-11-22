export default class ShoppingItemAttribute {
  name: string;
  value: Array<string>;

  constructor(name: string, value: Array<string>) {
    this.name = name;
    this.value = value;
  }
}