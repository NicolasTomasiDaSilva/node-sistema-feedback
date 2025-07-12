import { Template } from "../../domain/entities/template";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ForbiddenError, NotFoundError } from "../../domain/errors/errors";
import { GetTemplateDTO } from "../dtos/get-template-dto";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IGetTemplateUseCase } from "../protocols/use-cases/get-template-use-case";

export class GetTemplateUseCase implements IGetTemplateUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: GetTemplateDTO): Promise<Template> {
    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can get Template"
      );
    }

    const template = await this.unitOfWork
      .getTemplateRepository()
      .findById(data.id, data.currentUser.companyId);

    if (!template) {
      throw new NotFoundError("Template not found");
    }

    return template;
  }
}
