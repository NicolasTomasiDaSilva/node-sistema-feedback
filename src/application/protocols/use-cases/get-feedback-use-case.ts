import { Feedback } from "../../../domain/entities/feedback";
import { GetFeedbackDTO } from "../../dtos/get-feedback-dto";

export interface IGetFeedbackUseCase {
  execute(data: GetFeedbackDTO): Promise<Feedback>;
}
