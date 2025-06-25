import bcrypt from "bcrypt";
import { IHasher } from "../../application/protocols/hasher";

export class BcryptAdapter implements IHasher {
  constructor(private readonly saltRounds = 12) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
