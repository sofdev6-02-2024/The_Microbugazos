import { UUID } from "crypto";
import VariantStock from "./VariantStock";

export default class InventoryReservation {

  clientId: UUID;
  products: Array<VariantStock>;

  constructor(clientId: UUID, products: Array<VariantStock>) {
    this.clientId = clientId;
    this.products = products;
  }
}