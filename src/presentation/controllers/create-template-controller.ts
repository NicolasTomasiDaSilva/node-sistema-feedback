import { CreateTemplateDTO } from "../../application/dtos/create-template-dto";
import { ICreateTemplateUseCase } from "../../application/protocols/use-cases/create-template-use-case";
import { getCurrentUser } from "../guardars/get-current-user";
import { created } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { IValidator } from "../protocols/validate";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class CreateTemplateController implements IController {
  constructor(
    private readonly createTemplateUseCase: ICreateTemplateUseCase,
    private readonly bodyValidator: IValidator<
      Omit<CreateTemplateDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);

    const data = this.bodyValidator.validate(request.body);

    const dto: CreateTemplateDTO = {
      currentUser: currentUser,
      ...data,
    };
    return created((await this.createTemplateUseCase.execute(dto)).toJSON());
  }
}
