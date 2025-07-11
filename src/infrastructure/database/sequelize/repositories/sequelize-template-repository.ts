import { Transaction } from "sequelize";
import { ITemplateRepository } from "../../../../application/protocols/repositories/template-repository";
import { IUuidGenerator } from "../../../../application/protocols/uuid-generator";
import { Template } from "../../../../domain/entities/template";
import { TemplateItemMapper } from "../mappers/template-item-mapper";
import { TemplateMapper } from "../mappers/template-mapper";
import { TemplateModel } from "../models/template";
import { TemplateItemModel } from "../models/template-item";

export class SequelizeTemplateRepository implements ITemplateRepository {
  constructor(
    private readonly uuidGenerator: IUuidGenerator,
    private transaction?: Transaction
  ) {}

  async create(data: Template, companyId: string): Promise<Template> {
    const templateModel = TemplateMapper.toPersistence(data);
    templateModel.companyId = companyId;
    await TemplateModel.create(templateModel, {
      transaction: this.transaction,
    });

    if (data.items) {
      const templateItemsModels = data.items.map((item) => {
        const persistenceData = TemplateItemMapper.toPersistence(item);
        const now = new Date();
        return {
          ...persistenceData,
          id: this.uuidGenerator.generate(),
          templateId: templateModel.id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
      });

      await TemplateItemModel.bulkCreate(templateItemsModels, {
        transaction: this.transaction,
      });
    }

    const createdTemplate = await TemplateModel.findByPk(templateModel.id, {
      transaction: this.transaction,
    });
    if (!createdTemplate) {
      throw new Error("Template not found");
    }

    return TemplateMapper.toEntity(createdTemplate);
  }

  async findById(id: string, companyId: string): Promise<Template | null> {
    const templateModel = await TemplateModel.findOne({
      where: { id, companyId },
      include: [{ model: TemplateItemModel, as: "items" }],
      transaction: this.transaction,
    });

    if (!templateModel) {
      return null;
    }

    return TemplateMapper.toEntity(templateModel);
  }

  async update(data: Template, companyId: string): Promise<Template> {
    const templateModel = TemplateMapper.toPersistence(data);
    templateModel.companyId = companyId;

    await TemplateModel.update(data, {
      where: { id: data.id, companyId },
      transaction: this.transaction,
    });

    // Deletar todos os itens existentes
    await TemplateItemModel.destroy({
      where: { templateId: data.id },
      transaction: this.transaction,
    });

    // Criar os novos itens
    if (data.items) {
      const templateItemsModels = data.items.map((item) => {
        const persistenceData = TemplateItemMapper.toPersistence(item);
        const now = new Date();
        return {
          ...persistenceData,
          id: this.uuidGenerator.generate(),
          templateId: data.id,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };
      });

      await TemplateItemModel.bulkCreate(templateItemsModels, {
        transaction: this.transaction,
      });
    }

    const updatedTemplateModel = await TemplateModel.findOne({
      where: { id: data.id, companyId },
      include: [{ model: TemplateItemModel, as: "items" }],
      transaction: this.transaction,
    });

    if (!updatedTemplateModel) {
      throw new Error("Template not found after update");
    }

    return TemplateMapper.toEntity(updatedTemplateModel);
  }

  async findAll({
    companyId,
    page,
    perPage,
  }: {
    companyId: string;
    page: number;
    perPage: number;
  }): Promise<Template[]> {
    const offset = (page - 1) * perPage;

    const templateModels = await TemplateModel.findAll({
      where: { companyId },
      include: [{ model: TemplateItemModel, as: "items" }],
      limit: perPage,
      offset,
      order: [["createdAt", "DESC"]],
      transaction: this.transaction,
    });

    return TemplateMapper.toEntityList(templateModels);
  }
}
