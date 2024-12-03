import { UUID } from "crypto";

export default class Category {
  id: UUID;
  name: string;
  subCategories: any

  constructor(id: UUID, name: string, subCategories) {
    this.id = id;
    this.name = name;
    this.subCategories = subCategories ?? []
  }
}
