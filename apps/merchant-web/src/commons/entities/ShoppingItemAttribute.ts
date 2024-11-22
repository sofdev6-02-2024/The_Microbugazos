export class ShoppingItemAttribute {
  name: string;
  value: Array<string>;

  constructor(name: string, value: Array<string>) {
    this.name = name;
    this.value = value;
  }
}

export class ShoppingItemSelectedAttribute {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}