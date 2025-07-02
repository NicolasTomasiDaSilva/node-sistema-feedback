import { TemplateFeedback } from "../../../domain/entities/template-feedback";

export interface ITemplateFeedbackRepository {
  create(data: TemplateFeedback, companyId: string): Promise<TemplateFeedback>;
}
