import { ITemplateFeedbackRepository } from "../../../../application/protocols/repositories/template-feedback-repository";
import { TemplateFeedback } from "../../../../domain/entities/template-feedback";
import { TemplateFeedbackItemMapper } from "../mappers/template-feedback-item-mapper";
import { TemplateFeedbackMapper } from "../mappers/template-feedback-mapper";
import { TemplateFeedbackModel } from "../models/template-feedback";
import { TemplateFeedbackItemModel } from "../models/template-feedback-item";
import { IUuidGenerator } from "../../../../application/protocols/uuid-generator";
import { Transaction } from "sequelize";

export class SequelizeTemplateFeedbackRepository
  implements ITemplateFeedbackRepository
{
  constructor(
    private readonly uuidGenerator: IUuidGenerator,
    private transaction?: Transaction
  ) {}

  async create(
    data: TemplateFeedback,
    companyId: string
  ): Promise<TemplateFeedback> {
    const templateFeedbackModel = TemplateFeedbackMapper.toPersistence(data);
    templateFeedbackModel.companyId = companyId;
    const createdTemplateFeedback = await TemplateFeedbackModel.create(
      templateFeedbackModel,
      { transaction: this.transaction }
    );

    const templateFeedback = TemplateFeedbackMapper.toEntity(
      createdTemplateFeedback
    );

    if (data.items) {
      const templateFeedbackItemsModels = data.items.map((item) => {
        const persistenceData = TemplateFeedbackItemMapper.toPersistence(item);
        const now = new Date();
        return {
          ...persistenceData,
          id: this.uuidGenerator.generate(),
          templateFeedbackId: createdTemplateFeedback.id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
      });
      const createdTemplateFeedbackItems =
        await TemplateFeedbackItemModel.bulkCreate(
          templateFeedbackItemsModels,
          {
            transaction: this.transaction,
          }
        );

      templateFeedback.items = TemplateFeedbackItemMapper.toEntityList(
        createdTemplateFeedbackItems
      );
    }

    return templateFeedback;
  }
}
