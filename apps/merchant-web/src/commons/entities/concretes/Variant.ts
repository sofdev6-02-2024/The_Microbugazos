import { UUID } from "crypto";
import EntityBase from "../EntityBase";
import ProductAttribute from "./ProductAttribute";

export default class Variant extends EntityBase {
  name: string;
  productAttributes: Array<ProductAttribute>;

  constructor(id: UUID, name: string, productAttributes: Array<ProductAttribute>) {
    super(id);
    this.name = name;
    this.productAttributes = productAttributes;
  }
}