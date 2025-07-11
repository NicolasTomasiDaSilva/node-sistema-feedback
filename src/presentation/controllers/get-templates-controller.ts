import { GetTemplatesDTO } from "../../application/dtos/get-templates-dto";
import { IGetTemplatesUseCase } from "../../application/protocols/use-cases/get-templates-use-case";
import { getCurrentUser } from "../guardars/get-current-user";
import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { IValidator } from "../protocols/validate";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class GetTemplatesController implements IController {
  constructor(
    private readonly getTemplatesUseCase: IGetTemplatesUseCase,
    private readonly queryValidator: IValidator<
      Omit<GetTemplatesDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);
    const data = this.queryValidator.validate(request.query);
    const dto: GetTemplatesDTO = {
      currentUser,
      ...data,
    };
    const templates = await this.getTemplatesUseCase.execute(dto);
    return ok(templates.map((t) => t.toJSON()));
  }
}
