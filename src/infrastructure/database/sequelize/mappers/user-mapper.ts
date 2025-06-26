import { CreationAttributes } from "sequelize";
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
      role: model.role,
      feedbacks: model.receivedFeedbacks
        ? FeedbackMapper.toEntityList(model.receivedFeedbacks)
        : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toPersistence(entity: User): CreationAttributes<UserModel> {
    return {
      id: entity.id,
      companyId: entity.companyId,
      email: entity.email,
      name: entity.name,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
