import { Feedback } from "../../../domain/entities/feedback";
import { RoleEnum } from "../../../domain/enums/role-enum";

export interface IFeedbackRepository {
  create(data: Feedback): Promise<Feedback>;
  findManyByRole(
    companyId: string,
    userId: string,
    role: RoleEnum,
    page: number,
    perPage: number
  ): Promise<Feedback[]>;
}
