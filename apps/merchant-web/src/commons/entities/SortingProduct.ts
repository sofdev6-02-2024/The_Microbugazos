import { SortingType } from "./SortingType";

export class SortingProduct {
  name: SortingType;
  price: SortingType;
  rating: SortingType;

  constructor() {
    this.name = SortingType.NONE;
    this.price = SortingType.NONE;
    this.rating = SortingType.NONE;
  }
}
