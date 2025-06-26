import { User } from "../../../domain/entities/user";

export interface IUserRepository {
  getByEmail(email: string): Promise<User | null>;
}
