import { IFeedbackRepository } from "../../../../application/protocols/repositories/feedback-repository";
import { Feedback } from "../../../../domain/entities/feedback";
import { RoleEnum } from "../../../../domain/enums/role-enum";
import { FeedbackItemMapper } from "../mappers/feedback-item-mapper";
import { FeedbackMapper } from "../mappers/feedback-mapper";
import { FeedbackModel } from "../models/feedback";
import { FeedbackItemModel } from "../models/feedback-item";

export class SequelizeFeedbackRepository implements IFeedbackRepository {
  async create(data: Feedback): Promise<Feedback> {
    const feedbackModel = FeedbackMapper.toPersistence(data);
    const createdFeedback = await FeedbackModel.create(feedbackModel);

    const Feedback = FeedbackMapper.toEntity(createdFeedback);

    if (data.items) {
      const FeedbackItemsModels = data.items.map((item) => {
        return FeedbackItemMapper.toPersistence(item);
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
  }: {
    companyId: string;
    page: number;
    perPage: number;
    receiverId?: string;
  }): Promise<Feedback[]> {
    let where: any = { companyId: companyId };
    if (receiverId) {
      where.receiverId = receiverId;
    }

    const models = await FeedbackModel.findAll({
      where,
      include: [{ model: FeedbackItemModel, as: "items" }],
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "DESC"]],
    });

    return FeedbackMapper.toEntityList(models);
  }
}
