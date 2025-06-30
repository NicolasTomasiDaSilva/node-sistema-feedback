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

  async findManyByRole(
    companyId: string,
    userId: string,
    role: RoleEnum,
    page: number,
    perPage: number
  ): Promise<Feedback[]> {
    const where: any = { companyId };
    if (role === RoleEnum.supervisor) {
      where.giverId = userId;
    } else if (role === RoleEnum.employee) {
      where.receiverId = userId;
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
