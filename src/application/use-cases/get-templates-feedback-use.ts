import { TemplateFeedback } from "../../domain/entities/template-feedback";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ForbiddenError } from "../../domain/errors/errors";
import { GetTemplatesFeedbackDTO } from "../dtos/get-templates-feedback-dto";

import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IGetTemplatesFeedbackUseCase } from "../protocols/use-cases/get-templates-feedback-use";

export class GetTemplatesFeedbackUseCase
  implements IGetTemplatesFeedbackUseCase
{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: GetTemplatesFeedbackDTO): Promise<TemplateFeedback[]> {
    const { currentUser, page, perPage } = data;

    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can get Templates Feedback"
      );
    }

    return this.unitOfWork.getTemplateFeedbackRepository().findAll({
      companyId: currentUser.companyId,
      page: page ?? 1,
      perPage: perPage ?? 5,
    });
  }
}
