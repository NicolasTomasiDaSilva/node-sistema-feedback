import { TemplateFeedback } from "../../../domain/entities/template-feedback";
import { CreateTemplateFeedbackDTO } from "../../dtos/create-template-feedback-dto";

export interface ICreateTemplateFeedbackUseCase {
  execute(data: CreateTemplateFeedbackDTO): Promise<TemplateFeedback>;
}
