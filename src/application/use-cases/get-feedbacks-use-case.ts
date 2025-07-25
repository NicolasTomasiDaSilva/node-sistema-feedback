import { Feedback } from "../../domain/entities/feedback";
import { RoleEnum } from "../../domain/enums/role-enum";
import { GetFeedbacksDTO } from "../dtos/get-feedbacks-dto";

import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { IGetFeedbacksUseCase } from "../protocols/use-cases/get-feedbacks-use-case";

export class GetFeedbacksUseCase implements IGetFeedbacksUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: GetFeedbacksDTO): Promise<Feedback[]> {
    const { currentUser, page, perPage, receiverName, minScore, maxScore } =
      data;
    if (
      currentUser.role === RoleEnum.manager ||
      currentUser.role === RoleEnum.supervisor
    ) {
      return this.unitOfWork.getFeedbackRepository().findAll({
        companyId: currentUser.companyId,
        page: page ?? 1,
        perPage: perPage ?? 5,
        receiverName,
        minScore,
        maxScore,
      });
    }
    return this.unitOfWork.getFeedbackRepository().findAll({
      companyId: currentUser.companyId,
      page: page ?? 1,
      perPage: perPage ?? 5,
      receiverId: currentUser.id,
      minScore,
      maxScore,
    });
  }
}
