import { IFeedbackRepository } from "../../../application/protocols/repositories/feedback-repository";
import { SequelizeFeedbackRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-feedback-repository ";

export function makeFeedbackRepository(): IFeedbackRepository {
  return new SequelizeFeedbackRepository();
}
