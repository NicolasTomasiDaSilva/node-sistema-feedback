import { UpdateTemplateDTO } from "../../application/dtos/update-template-dto";
import { IUpdateTemplateUseCase } from "../../application/protocols/use-cases/update-template-use-case";
import { getCurrentUser } from "../guardars/get-current-user";
import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { IValidator } from "../protocols/validate";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class UpdateTemplateController implements IController {
  constructor(
    private readonly updateTemplateUseCase: IUpdateTemplateUseCase,
    private readonly bodyValidator: IValidator<
      Omit<UpdateTemplateDTO, "currentUser" | "id">
    >,
    private readonly paramsValidator: IValidator<{ id: string }>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);
    const { id } = this.paramsValidator.validate(request.params);
    const data = this.bodyValidator.validate(request.body);

    const dto: UpdateTemplateDTO = {
      currentUser: currentUser,
      id: id,
      ...data,
    };

    return ok((await this.updateTemplateUseCase.execute(dto)).toJSON());
  }
}
