import { Invitation } from "../../domain/entities/invitation";
import { TemplateFeedback } from "../../domain/entities/template-feedback";
import { TemplateFeedbackItem } from "../../domain/entities/template-feedback-item";
import { RoleEnum } from "../../domain/enums/role-enum";
import { BadRequestError, ForbiddenError } from "../../domain/errors/errors";
import { CreateTemplateFeedbackDTO } from "../dtos/create-template-feedback-dto";

import { ITemplateFeedbackRepository } from "../protocols/repositories/template-feedback-repository";
import { ICreateTemplateFeedbackUseCase } from "../protocols/use-cases/create-template-feedback-use-case";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IUuidGenerator } from "../protocols/uuid-generator";

export class CreateTemplateFeedbackUseCase
  implements ICreateTemplateFeedbackUseCase
{
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly uuidGenerator: IUuidGenerator
  ) {}

  async execute(data: CreateTemplateFeedbackDTO): Promise<TemplateFeedback> {
    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError(
        "Only managers and supervisors can create Template Feedback"
      );
    }
    if (!data.items.length) {
      throw new BadRequestError(
        "Template Feedback must have at least one item"
      );
    }

    const templateFeedbackId = this.uuidGenerator.generate();

    const templateFeedback = TemplateFeedback.create({
      id: templateFeedbackId,
      title: data.title,
      items: data.items.map((item) => {
        if (item.weight < 1 || item.weight > 5) {
          throw new BadRequestError("Weight must be between 1 and 5");
        }
        return TemplateFeedbackItem.create({
          label: item.label,
          description: item.description,
          weight: item.weight,
          order: item.order,
        });
      }),
    });

    try {
      await this.unitOfWork.start();

      const createdTemplateFeedback = await this.unitOfWork
        .getTemplateFeedbackRepository()
        .create(templateFeedback, data.currentUser.companyId);

      await this.unitOfWork.commit();
      return createdTemplateFeedback;
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
