import { User } from "../../../domain/entities/user";

export interface IUserRepository {
  findAll({
    companyId,
    page,
    perPage,
    name,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    name?: string;
  }): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
