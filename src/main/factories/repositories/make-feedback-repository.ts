import { IFeedbackRepository } from "../../../application/protocols/repositories/feedback-repository";
import { SequelizeFeedbackRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-feedback-repository ";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";

export function makeFeedbackRepository(): IFeedbackRepository {
  return new SequelizeFeedbackRepository(new UuidAdapter());
}
