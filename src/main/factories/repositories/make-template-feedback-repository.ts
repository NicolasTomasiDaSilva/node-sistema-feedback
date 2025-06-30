import { ITemplateFeedbackRepository } from "../../../application/protocols/repositories/template-feedback-repository";
import { SequelizeTemplateFeedbackRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-template-feedback-repository";

export function makeTemplateFeedbackRepository(): ITemplateFeedbackRepository {
  return new SequelizeTemplateFeedbackRepository();
}
