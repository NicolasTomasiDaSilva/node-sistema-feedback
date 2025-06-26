import { IUserRepository } from "../../../../application/protocols/repositories/user-repository";

import { User } from "../../../../domain/entities/user";
import { UserMapper } from "../mappers/user-mapper";

import { UserModel } from "../models/user";

export class SequelizeUserRepository implements IUserRepository {
  async getByEmail(email: string): Promise<User | null> {
    const model: UserModel | null = await UserModel.findOne({
      where: { email },
    });
    return model ? UserMapper.toEntity(model) : null;
  }
}
