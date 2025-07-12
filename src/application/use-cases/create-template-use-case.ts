import { Template } from "../../domain/entities/template";
import { TemplateItem } from "../../domain/entities/template-item";
import { User } from "../../domain/entities/user";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ForbiddenError, NotFoundError } from "../../domain/errors/errors";
import { CreateTemplateDTO } from "../dtos/create-template-dto";

import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { ICreateTemplateUseCase } from "../protocols/use-cases/create-template-use-case";
import { IUuidGenerator } from "../protocols/uuid-generator";

export class CreateTemplateUseCase implements ICreateTemplateUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly uuidGenerator: IUuidGenerator
  ) {}

  async execute(data: CreateTemplateDTO): Promise<Template> {
    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can create Template"
      );
    }

    const templateId = this.uuidGenerator.generate();

    try {
      await this.unitOfWork.start();

      const creator: User | null = await this.unitOfWork
        .getUserRepository()
        .findById(data.currentUser.id, data.currentUser.companyId);

      if (!creator) {
        throw new NotFoundError("Creator not found");
      }

      const template = Template.create({
        id: templateId,
        title: data.title,
        creator: creator,
        items: data.items.map((item) => {
          return TemplateItem.create({
            label: item.label,
            description: item.description,
            weight: item.weight,
            order: item.order,
          });
        }),
      });

      const createdTemplate = await this.unitOfWork
        .getTemplateRepository()
        .create(template, data.currentUser.companyId);

      await this.unitOfWork.commit();
      return createdTemplate;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
