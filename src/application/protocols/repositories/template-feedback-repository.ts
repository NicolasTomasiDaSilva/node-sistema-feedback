import { TemplateFeedback } from "../../../domain/entities/template-feedback";

export interface ITemplateFeedbackRepository {
  create(data: TemplateFeedback, companyId: string): Promise<TemplateFeedback>;
  findById(id: string, companyId: string): Promise<TemplateFeedback | null>;
  update(data: TemplateFeedback, companyId: string): Promise<TemplateFeedback>;

  findAll({
    companyId,
    page,
    perPage,
  }: {
    companyId: string;
    page: number;
    perPage: number;
  }): Promise<TemplateFeedback[]>;
}
