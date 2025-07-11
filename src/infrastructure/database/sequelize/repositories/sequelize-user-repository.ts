import { Op, Transaction } from "sequelize";
import { IUserRepository } from "../../../../application/protocols/repositories/user-repository";
import { User } from "../../../../domain/entities/user";
import { UserMapper } from "../mappers/user-mapper";
import { UserModel } from "../models/user";

export class SequelizeUserRepository implements IUserRepository {
  constructor(private transaction?: Transaction) {}

  async findAll({
    companyId,
    page,
    perPage,
    name,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    name?: string;
  }): Promise<User[]> {
    const where: any = { companyId };

    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    const models = await UserModel.findAll({
      where,
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["name", "ASC"]],
      transaction: this.transaction,
    });

    return models.map((model) => UserMapper.toEntity(model));
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await UserModel.findOne({
      where: { email },
      transaction: this.transaction,
    });
    return model ? UserMapper.toEntity(model) : null;
  }

  async findById(id: string, companyId: string): Promise<User | null> {
    const model = await UserModel.findOne({
      where: { id, companyId },
      transaction: this.transaction,
    });
    return model ? UserMapper.toEntity(model) : null;
  }
}
