import { Op, Transaction } from "sequelize";
import { ITemplateRepository } from "../../../../application/protocols/repositories/template-repository";
import { IUuidGenerator } from "../../../../application/protocols/uuid-generator";
import { Template } from "../../../../domain/entities/template";
import { TemplateItemMapper } from "../mappers/template-item-mapper";
import { TemplateMapper } from "../mappers/template-mapper";
import { TemplateModel } from "../models/template";
import { TemplateItemModel } from "../models/template-item";
import { UserModel } from "../models/user";

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
      include: [
        { model: TemplateItemModel, as: "items" },
        { model: UserModel, as: "creator" },
      ],
    });

    if (!createdTemplate) {
      throw new Error("Template not found");
    }

    return TemplateMapper.toEntity(createdTemplate);
  }

  async findById(id: string, companyId: string): Promise<Template | null> {
    const templateModel = await TemplateModel.findOne({
      where: { id, companyId },
      include: [
        { model: TemplateItemModel, as: "items" },
        { model: UserModel, as: "creator" },
      ],
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

    await TemplateModel.update(templateModel, {
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

    const updatedTemplateModel = await TemplateModel.findByPk(data.id, {
      include: [
        { model: TemplateItemModel, as: "items" },
        { model: UserModel, as: "creator" },
      ],
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
    templateName,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    templateName?: string;
  }): Promise<Template[]> {
    const where: any = { companyId };

    if (templateName) {
      where.title = {
        [Op.iLike]: `%${templateName}%`,
      };
    }

    const templateModels = await TemplateModel.findAll({
      where: where,
      include: [
        { model: TemplateItemModel, as: "items" },
        { model: UserModel, as: "creator" },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "DESC"]],
      transaction: this.transaction,
    });

    return TemplateMapper.toEntityList(templateModels);
  }
}
