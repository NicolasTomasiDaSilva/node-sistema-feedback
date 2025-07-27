import { Template } from "../../domain/entities/template";
import { TemplateItem } from "../../domain/entities/template-item";
import { RoleEnum } from "../../domain/enums/role-enum";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../domain/errors/errors";
import { UpdateTemplateDTO } from "../dtos/update-template-dto";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IUpdateTemplateUseCase } from "../protocols/use-cases/update-template-use-case";

export class UpdateTemplateUseCase implements IUpdateTemplateUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: UpdateTemplateDTO): Promise<Template> {
    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can update Template"
      );
    }

    if (!data.items.length) {
      throw new BadRequestError("Template must have at least one item");
    }

    try {
      await this.unitOfWork.start();

      const existingTemplate = await this.unitOfWork
        .getTemplateRepository()
        .findById(data.id, data.currentUser.companyId);

      if (!existingTemplate) {
        throw new NotFoundError("Template not found");
      }

      existingTemplate.description = data.description;
      existingTemplate.title = data.title;
      existingTemplate.items = data.items.map((item) =>
        TemplateItem.create({
          label: item.label,
          description: item.description,
          weight: item.weight,
          order: item.order,
        })
      );

      const result = await this.unitOfWork
        .getTemplateRepository()
        .update(existingTemplate, data.currentUser.companyId);

      await this.unitOfWork.commit();
      return result;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
