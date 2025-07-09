import { TemplateFeedback } from "../../domain/entities/template-feedback";
import { TemplateFeedbackItem } from "../../domain/entities/template-feedback-item";
import { RoleEnum } from "../../domain/enums/role-enum";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../domain/errors/errors";
import { UpdateTemplateFeedbackDTO } from "../dtos/update-template-feedback-dto";
import { ITemplateFeedbackRepository } from "../protocols/repositories/template-feedback-repository";
import { IUpdateTemplateFeedbackUseCase } from "../protocols/use-cases/update-template-feedback-use-case";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";

export class UpdateTemplateFeedbackUseCase
  implements IUpdateTemplateFeedbackUseCase
{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: UpdateTemplateFeedbackDTO): Promise<TemplateFeedback> {
    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can update Template Feedback"
      );
    }

    if (!data.items.length) {
      throw new BadRequestError(
        "Template Feedback must have at least one item"
      );
    }

    try {
      await this.unitOfWork.start();

      const existingTemplateFeedback = await this.unitOfWork
        .getTemplateFeedbackRepository()
        .findById(data.id, data.currentUser.companyId);

      if (!existingTemplateFeedback) {
        throw new NotFoundError("Template Feedback not found");
      }

      // Atualizar no repositório
      const result = await this.unitOfWork
        .getTemplateFeedbackRepository()
        .update(existingTemplateFeedback, data.currentUser.companyId);

      await this.unitOfWork.commit();
      return result;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
