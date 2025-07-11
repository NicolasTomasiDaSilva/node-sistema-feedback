import { Op, Transaction } from "sequelize";
import { IFeedbackRepository } from "../../../../application/protocols/repositories/feedback-repository";
import { IUuidGenerator } from "../../../../application/protocols/uuid-generator";
import { Feedback } from "../../../../domain/entities/feedback";
import { FeedbackItemMapper } from "../mappers/feedback-item-mapper";
import { FeedbackMapper } from "../mappers/feedback-mapper";
import { FeedbackModel } from "../models/feedback";
import { FeedbackItemModel } from "../models/feedback-item";
import { UserModel } from "../models/user";

export class SequelizeFeedbackRepository implements IFeedbackRepository {
  constructor(
    private readonly uuidGenerator: IUuidGenerator,
    private transaction?: Transaction
  ) {}

  async create(data: Feedback, companyId: string): Promise<Feedback> {
    const feedbackModel = FeedbackMapper.toPersistence(data);
    feedbackModel.companyId = companyId;
    await FeedbackModel.create(feedbackModel, {
      transaction: this.transaction,
    });

    if (data.items) {
      const FeedbackItemsModels = data.items.map((item) => {
        const persistenceData = FeedbackItemMapper.toPersistence(item);
        const now = new Date();
        return {
          ...persistenceData,
          id: this.uuidGenerator.generate(),
          feedbackId: feedbackModel.id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
      });
      await FeedbackItemModel.bulkCreate(FeedbackItemsModels, {
        transaction: this.transaction,
      });
    }
    const createdFeedback = await FeedbackModel.findByPk(feedbackModel.id, {
      transaction: this.transaction,
      include: [{ model: UserModel, as: "receiver" }],
    });
    if (!createdFeedback) {
      throw new Error("Feedback not found");
    }

    return FeedbackMapper.toEntity(createdFeedback);
  }

  async findAll({
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
      transaction: this.transaction,
    });

    return FeedbackMapper.toEntityList(models);
  }
}
