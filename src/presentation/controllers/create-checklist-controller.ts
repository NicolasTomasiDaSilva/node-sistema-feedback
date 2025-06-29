import { created } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IValidator } from "../protocols/validate";
import { getCurrentUser } from "../guardars/get-current-user";
import { CreateChecklistDTO } from "../../application/dtos/checklist/create-checklist-dto";
import { ICreateChecklistUseCase } from "../../application/protocols/use-cases/create-checklist-use-case";

export class CreateChecklistController implements IController {
  constructor(
    private readonly createChecklistUseCase: ICreateChecklistUseCase,
    private readonly bodyValidator: IValidator<
      Omit<CreateChecklistDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);

    const { title, items } = this.bodyValidator.validate(request.body);

    const dto: CreateChecklistDTO = {
      currentUser: currentUser,
      title: title,
      items: items,
    };
    return created((await this.createChecklistUseCase.execute(dto)).toJSON());
  }
}
