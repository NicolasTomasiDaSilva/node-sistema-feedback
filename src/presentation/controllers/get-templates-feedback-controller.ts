import { GetTemplatesFeedbackDTO } from "../../application/dtos/get-templates-feedback-dto";
import { IGetTemplatesFeedbackUseCase } from "../../application/protocols/use-cases/get-templates-feedback-use";
import { getCurrentUser } from "../guardars/get-current-user";
import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { IValidator } from "../protocols/validate";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class GetTemplatesFeedbackController implements IController {
  constructor(
    private readonly getTemplatesFeedbackUseCase: IGetTemplatesFeedbackUseCase,
    private readonly queryValidator: IValidator<
      Omit<GetTemplatesFeedbackDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);
    const data = this.queryValidator.validate(request.query);
    const dto: GetTemplatesFeedbackDTO = {
      currentUser,
      ...data,
    };
    const templatesFeedback = await this.getTemplatesFeedbackUseCase.execute(
      dto
    );
    return ok(templatesFeedback.map((t) => t.toJSON()));
  }
}
