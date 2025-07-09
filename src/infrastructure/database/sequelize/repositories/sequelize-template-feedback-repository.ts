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

      createdTemplateFeedback.items = createdTemplateFeedbackItems;
    }

    return TemplateFeedbackMapper.toEntity(createdTemplateFeedback);
  }

  async findById(
    id: string,
    companyId: string
  ): Promise<TemplateFeedback | null> {
    const templateFeedbackModel = await TemplateFeedbackModel.findOne({
      where: { id, companyId },
      include: [{ model: TemplateFeedbackItemModel, as: "items" }],
      transaction: this.transaction,
    });

    if (!templateFeedbackModel) {
      return null;
    }

    return TemplateFeedbackMapper.toEntity(templateFeedbackModel);
  }

  async update(
    data: TemplateFeedback,
    companyId: string
  ): Promise<TemplateFeedback> {
    const templateFeedbackModel = TemplateFeedbackMapper.toPersistence(data);
    templateFeedbackModel.companyId = companyId;

    await TemplateFeedbackModel.update(data, {
      where: { id: data.id, companyId },
      transaction: this.transaction,
    });

    // Deletar todos os itens existentes
    await TemplateFeedbackItemModel.destroy({
      where: { templateFeedbackId: data.id },
      transaction: this.transaction,
    });

    // Criar os novos itens
    if (data.items) {
      const templateFeedbackItemsModels = data.items.map((item) => {
        const persistenceData = TemplateFeedbackItemMapper.toPersistence(item);
        const now = new Date();
        return {
          ...persistenceData,
          id: this.uuidGenerator.generate(),
          templateFeedbackId: data.id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
      });

      await TemplateFeedbackItemModel.bulkCreate(templateFeedbackItemsModels, {
        transaction: this.transaction,
      });
    }

    const updatedTemplateFeedbackModel = await TemplateFeedbackModel.findOne({
      where: { id: data.id, companyId },
      include: [{ model: TemplateFeedbackItemModel, as: "items" }],
      transaction: this.transaction,
    });

    if (!updatedTemplateFeedbackModel) {
      throw new Error("Template Feedback not found after update");
    }

    return TemplateFeedbackMapper.toEntity(updatedTemplateFeedbackModel);
  }
}
