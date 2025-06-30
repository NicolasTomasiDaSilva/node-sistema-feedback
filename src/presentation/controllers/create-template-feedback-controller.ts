import { created } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IValidator } from "../protocols/validate";
import { getCurrentUser } from "../guardars/get-current-user";
import { ICreateTemplateFeedbackUseCase } from "../../application/protocols/use-cases/create-template-feedback-use-case";
import { CreateTemplateFeedbackDTO } from "../../application/dtos/create-template-feedback-dto";

export class CreateTemplateFeedbackController implements IController {
  constructor(
    private readonly createTemplateFeedbackUseCase: ICreateTemplateFeedbackUseCase,
    private readonly bodyValidator: IValidator<
      Omit<CreateTemplateFeedbackDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);

    const data = this.bodyValidator.validate(request.body);

    const dto: CreateTemplateFeedbackDTO = {
      currentUser: currentUser,
      ...data,
    };
    return created(
      (await this.createTemplateFeedbackUseCase.execute(dto)).toJSON()
    );
  }
}
