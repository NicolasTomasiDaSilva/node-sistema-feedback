import { IFeedbackRepository } from "../../../../application/protocols/repositories/feedback-repository";
import { Feedback } from "../../../../domain/entities/feedback";
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
}
