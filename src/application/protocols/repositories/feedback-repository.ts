import { Feedback } from "../../../domain/entities/feedback";

export interface IFeedbackRepository {
  create(data: Feedback): Promise<Feedback>;
  find({
    companyId,
    page,
    perPage,
    receiverId,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    receiverId?: string;
  }): Promise<Feedback[]>;
}
