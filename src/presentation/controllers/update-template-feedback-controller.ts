import { UpdateTemplateFeedbackDTO } from "../../application/dtos/update-template-feedback-dto";
import { IUpdateTemplateFeedbackUseCase } from "../../application/protocols/use-cases/update-template-feedback-use-case";
import { getCurrentUser } from "../guardars/get-current-user";
import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { IValidator } from "../protocols/validate";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class UpdateTemplateFeedbackController implements IController {
  constructor(
    private readonly updateTemplateFeedbackUseCase: IUpdateTemplateFeedbackUseCase,
    private readonly bodyValidator: IValidator<
      Omit<UpdateTemplateFeedbackDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);

    const data = this.bodyValidator.validate(request.body);

    const dto: UpdateTemplateFeedbackDTO = {
      currentUser: currentUser,
      ...data,
    };

    return ok((await this.updateTemplateFeedbackUseCase.execute(dto)).toJSON());
  }
}
