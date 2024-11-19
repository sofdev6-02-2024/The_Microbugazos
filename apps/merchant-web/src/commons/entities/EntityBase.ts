import { UUID } from "crypto";

export default class EntityBase {
  id: UUID;

  constructor(id: UUID) {
    this.id = id;
  }
}