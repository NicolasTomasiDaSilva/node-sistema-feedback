import { ITemplateFeedbackRepository } from "../../../application/protocols/repositories/template-feedback-repository";
import { SequelizeTemplateFeedbackRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-template-feedback-repository";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";

export function makeTemplateFeedbackRepository(): ITemplateFeedbackRepository {
  return new SequelizeTemplateFeedbackRepository(new UuidAdapter());
}
