import { UUID } from "crypto";

export default class Category {
  id: UUID;
  name: string;

  constructor(id: UUID, name: string) {
    this.id = id;
    this.name = name;
  }
}