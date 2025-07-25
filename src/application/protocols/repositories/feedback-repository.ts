import { Feedback } from "../../../domain/entities/feedback";

export interface IFeedbackRepository {
  create(data: Feedback, companyId: string): Promise<Feedback>;
  findById(
    id: string,
    companyId: string,
    receiverId?: string
  ): Promise<Feedback | null>;
  findAll({
    companyId,
    page,
    perPage,
    receiverId,
    receiverName,
    minScore,
    maxScore,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    receiverId?: string;
    receiverName?: string;
    minScore?: number;
    maxScore?: number;
  }): Promise<Feedback[]>;
}
