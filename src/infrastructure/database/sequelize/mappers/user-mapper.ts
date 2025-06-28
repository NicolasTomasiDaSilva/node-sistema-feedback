import { CreationAttributes, InferAttributes } from "sequelize";
import { UserModel } from "../models/user";
import { User } from "../../../../domain/entities/user";
import { FeedbackMapper } from "./feedback-mapper";

export class UserMapper {
  static toEntity(model: UserModel): User {
    return User.fromPersistence({
      id: model.id,
      companyId: model.companyId,
      email: model.email,
      name: model.name,
      cpf: model.cpf,
      role: model.role,
      feedbacks: model.receivedFeedbacks
        ? FeedbackMapper.toEntityList(model.receivedFeedbacks)
        : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toEntityList(models: UserModel[]): User[] {
    return models.map((m) => this.toEntity(m));
  }

  static toPersistence(entity: User): InferAttributes<UserModel> {
    return {
      id: entity.id,
      companyId: entity.companyId,
      email: entity.email,
      name: entity.name,
      cpf: entity.cpf,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toPersistenceList(entities: User[]): InferAttributes<UserModel>[] {
    return entities.map((e) => this.toPersistence(e));
  }
}
