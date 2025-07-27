import { CreateInviteUserDTO } from "../../application/dtos/create-invite-user-dto";
import { ICreateInviteUserUseCase } from "../../application/protocols/use-cases/create-invite-user-use-case";
import { getCurrentUser } from "../guardars/get-current-user";
import { created } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { IValidator } from "../protocols/validate";
import { HttpResponse } from "../types/htpp-response";
import { HttpRequest } from "../types/http-request";

export class CreateInviteUserController implements IController {
  constructor(
    private readonly createInviteUserUseCase: ICreateInviteUserUseCase,
    private readonly bodyValidator: IValidator<
      Omit<CreateInviteUserDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);

    const data = this.bodyValidator.validate(request.body);

    const dto: CreateInviteUserDTO = {
      currentUser: currentUser,
      ...data,
    };
    return created((await this.createInviteUserUseCase.execute(dto)).toJSON());
  }
}
