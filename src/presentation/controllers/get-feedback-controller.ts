import { GetTemplateDTO } from "../../application/dtos/get-template-dto";
import { IGetFeedbackUseCase } from "../../application/protocols/use-cases/get-feedback-use-case";
import { getCurrentUser } from "../guardars/get-current-user";
import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { IValidator } from "../protocols/validate";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class GetFeedbackController implements IController {
  constructor(
    private readonly getFeedbackUseCase: IGetFeedbackUseCase,
    private readonly paramsValidator: IValidator<{ id: string }>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);
    const { id } = this.paramsValidator.validate(request.params);
    const dto: GetTemplateDTO = {
      currentUser,
      id,
    };
    const template = await this.getFeedbackUseCase.execute(dto);
    return ok(template.toJSON());
  }
}
