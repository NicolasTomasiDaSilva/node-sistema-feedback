import { TemplateFeedback } from "../../../domain/entities/template-feedback";
import { GetTemplatesFeedbackDTO } from "../../dtos/get-templates-feedback-dto";

export interface IGetTemplatesFeedbackUseCase {
  execute(data: GetTemplatesFeedbackDTO): Promise<TemplateFeedback[]>;
}
