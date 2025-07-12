import { Template } from "../../domain/entities/template";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ForbiddenError } from "../../domain/errors/errors";
import { GetTemplatesDTO } from "../dtos/get-templates-dto";

import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IGetTemplatesUseCase } from "../protocols/use-cases/get-templates-use-case";

export class GetTemplatesUseCase implements IGetTemplatesUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: GetTemplatesDTO): Promise<Template[]> {
    const { currentUser, page, perPage, templateName } = data;

    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can get Templates"
      );
    }

    return this.unitOfWork.getTemplateRepository().findAll({
      companyId: currentUser.companyId,
      page: page ?? 1,
      perPage: perPage ?? 5,
      templateName,
    });
  }
}
