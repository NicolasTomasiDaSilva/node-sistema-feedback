import { Feedback } from "../../../domain/entities/feedback";
import { GetFeedbacksDTO } from "../../dtos/get-feedbacks-dto";

export interface IGetFeedbacksUseCase {
  execute(data: GetFeedbacksDTO): Promise<Feedback[]>;
}
