import { IFeedbackRepository } from "../../../../application/protocols/repositories/feedback-repository";
import { Feedback } from "../../../../domain/entities/feedback";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { FeedbackItemMapper } from "../mappers/feedback-item-mapper";
import { FeedbackMapper } from "../mappers/feedback-mapper";
import { FeedbackModel } from "../models/feedback";
import { FeedbackItemModel } from "../models/feedback-item";
import { UserModel } from "../models/user";
import { IUuidGenerator } from "../../../../application/protocols/uuid-generator";
import { Op } from "sequelize";

export class SequelizeFeedbackRepository implements IFeedbackRepository {
  constructor(private readonly uuidGenerator: IUuidGenerator) {}

  async create(data: Feedback): Promise<Feedback> {
    const feedbackModel = FeedbackMapper.toPersistence(data);
    const createdFeedback = await FeedbackModel.create(feedbackModel);

    const Feedback = FeedbackMapper.toEntity(createdFeedback);

    if (data.items) {
      const FeedbackItemsModels = data.items.map((item) => {
        const persistenceData = FeedbackItemMapper.toPersistence(item);
        const now = new Date();
        return {
          ...persistenceData,
          id: this.uuidGenerator.generate(),
          feedbackId: createdFeedback.id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
      });
      const createdFeedbackItems = await FeedbackItemModel.bulkCreate(
        FeedbackItemsModels
      );

      Feedback.items = FeedbackItemMapper.toEntityList(createdFeedbackItems);
    }

    return Feedback;
  }

  async find({
    companyId,
    page,
    perPage,
    receiverId,
    receiverName,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    receiverId?: string;
    receiverName?: string;
  }): Promise<Feedback[]> {
    let where: any = { companyId: companyId };
    if (receiverId) {
      where.receiverId = receiverId;
    }

    const includeOptions: any[] = [{ model: FeedbackItemModel, as: "items" }];

    // Se há busca por nome, incluir o modelo de usuário receiver
    if (receiverName) {
      includeOptions.push({
        model: UserModel,
        as: "receiver",
        where: {
          name: {
            [Op.iLike]: `${receiverName}%`, // Busca nomes que começam com o parâmetro (case insensitive)
          },
        },
        attributes: ["id", "name", "email"], // Apenas os campos necessários
      });
    }

    const models = await FeedbackModel.findAll({
      where,
      include: includeOptions,
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "DESC"]],
    });

    return FeedbackMapper.toEntityList(models);
  }
}
