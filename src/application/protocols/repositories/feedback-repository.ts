import { Feedback } from "../../../domain/entities/feedback";

export interface IFeedbackRepository {
  create(data: Feedback): Promise<Feedback>;
}
