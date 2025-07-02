import { ok } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IValidator } from "../protocols/validate";
import { getCurrentUser } from "../guardars/get-current-user";
import { GetUsersDTO } from "../../application/dtos/get-users-dto";
import { IGetUsersUseCase } from "../../application/protocols/use-cases/get-users-use-case";

export class GetUsersController implements IController {
  constructor(
    private readonly getUsersUseCase: IGetUsersUseCase,
    private readonly queryValidator: IValidator<
      Omit<GetUsersDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);
    const data = this.queryValidator.validate(request.query);
    const dto: GetUsersDTO = {
      currentUser,
      ...data,
    };
    const users = await this.getUsersUseCase.execute(dto);
    return ok(users.map((user) => user.toJSON()));
  }
}
