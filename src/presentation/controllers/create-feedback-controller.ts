import { created } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IValidator } from "../protocols/validate";
import { getCurrentUser } from "../guardars/get-current-user";
import { CreateFeedbackDTO } from "../../application/dtos/create-feedback-dto";
import { ICreateFeedbackUseCase } from "../../application/protocols/use-cases/create-feedback-use-case";

export class CreateFeedbackController implements IController {
  constructor(
    private readonly createFeedbackUseCase: ICreateFeedbackUseCase,
    private readonly bodyValidator: IValidator<
      Omit<CreateFeedbackDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);

    const data = this.bodyValidator.validate(request.body);

    const dto: CreateFeedbackDTO = {
      currentUser: currentUser,
      ...data,
    };
    return created((await this.createFeedbackUseCase.execute(dto)).toJSON());
  }
}
