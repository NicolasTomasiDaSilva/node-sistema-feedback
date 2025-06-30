import { Feedback } from "../../../domain/entities/feedback";
import { CreateFeedbackDTO } from "../../dtos/create-feedback-dto";

export interface ICreateFeedbackUseCase {
  execute(data: CreateFeedbackDTO): Promise<Feedback>;
}
