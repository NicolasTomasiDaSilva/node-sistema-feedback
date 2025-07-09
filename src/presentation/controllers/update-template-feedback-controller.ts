import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IUpdateTemplateFeedbackUseCase } from "../../application/protocols/use-cases/update-template-feedback-use-case";
import { UpdateTemplateFeedbackDTO } from "../../application/dtos/update-template-feedback-dto";
import { ok, serverError } from "../helpers/http-responses";
import { getCurrentUser } from "../guardars/get-current-user";
import { IValidator } from "../protocols/validate";

export class UpdateTemplateFeedbackController implements IController {
  constructor(
    private readonly updateTemplateFeedbackUseCase: IUpdateTemplateFeedbackUseCase,
    private readonly bodyValidator: IValidator<
      Omit<UpdateTemplateFeedbackDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const currentUser = getCurrentUser(request);

      const data = this.bodyValidator.validate(request.body);

      const dto: UpdateTemplateFeedbackDTO = {
        currentUser: currentUser,
        ...data,
      };

      return ok(
        (await this.updateTemplateFeedbackUseCase.execute(dto)).toJSON()
      );
    } catch (error) {
      return serverError(error);
    }
  }
}
