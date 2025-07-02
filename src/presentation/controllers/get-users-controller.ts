import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IValidator } from "../protocols/validate";
import { getCurrentUser } from "../guardars/get-current-user";
import { GetFeedbacksDTO } from "../../application/dtos/get-feedbacks-dto";
import { IGetFeedbacksUseCase } from "../../application/protocols/use-cases/get-feedbacks-use-case";

export class GetFeedbacksController implements IController {
  constructor(
    private readonly getFeedbacksUseCase: IGetFeedbacksUseCase,
    private readonly queryValidator: IValidator<
      Omit<GetFeedbacksDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);
    const data = this.queryValidator.validate(request.query);
    const dto: GetFeedbacksDTO = {
      currentUser,
      ...data,
    };
    const feedbacks = await this.getFeedbacksUseCase.execute(dto);
    return ok(feedbacks.map((f) => f.toJSON()));
  }
}
