import { Feedback } from "../../../domain/entities/feedback";

export interface IFeedbackRepository {
  create(data: Feedback, companyId: string): Promise<Feedback>;
  findAll({
    companyId,
    page,
    perPage,
    receiverId,
    receiverName,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    receiverId?: string;
    receiverName?: string;
  }): Promise<Feedback[]>;
}
