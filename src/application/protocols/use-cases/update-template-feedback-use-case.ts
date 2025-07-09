import { TemplateFeedback } from "../../../domain/entities/template-feedback";
import { UpdateTemplateFeedbackDTO } from "../../dtos/update-template-feedback-dto";

export interface IUpdateTemplateFeedbackUseCase {
  execute(data: UpdateTemplateFeedbackDTO): Promise<TemplateFeedback>;
}
