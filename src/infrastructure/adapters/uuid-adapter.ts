import { v4 as uuidv4 } from "uuid";
import { IUuidGenerator } from "../../application/protocols/uuid-generator";

export class UuidAdapter implements IUuidGenerator {
  generate(): string {
    return uuidv4();
  }
}
