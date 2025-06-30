import { ITemplateFeedbackRepository } from "../../../../application/protocols/repositories/template-feedback-repository";
import { TemplateFeedback } from "../../../../domain/entities/template-feedback";
import { TemplateFeedbackItemMapper } from "../mappers/template-feedback-item-mapper";
import { TemplateFeedbackMapper } from "../mappers/template-feedback-mapper";
import { TemplateFeedbackModel } from "../models/template-feedback";
import { TemplateFeedbackItemModel } from "../models/template-feedback-item";

export class SequelizeTemplateFeedbackRepository
  implements ITemplateFeedbackRepository
{
  async create(data: TemplateFeedback): Promise<TemplateFeedback> {
    const templateFeedbackModel = TemplateFeedbackMapper.toPersistence(data);
    const createdTemplateFeedback = await TemplateFeedbackModel.create(
      templateFeedbackModel
    );

    const templateFeedback = TemplateFeedbackMapper.toEntity(
      createdTemplateFeedback
    );

    if (data.items) {
      const templateFeedbackItemsModels = data.items.map((item) => {
        return TemplateFeedbackItemMapper.toPersistence(item);
      });
      const createdTemplateFeedbackItems =
        await TemplateFeedbackItemModel.bulkCreate(templateFeedbackItemsModels);

      templateFeedback.items = TemplateFeedbackItemMapper.toEntityList(
        createdTemplateFeedbackItems
      );
    }

    return templateFeedback;
  }
}
