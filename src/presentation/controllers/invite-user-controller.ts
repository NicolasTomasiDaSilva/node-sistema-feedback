import {
  badRequest,
  created,
  ok,
  serverError,
} from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IInviteUserUseCase } from "../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserDTO } from "../../application/dtos/invite-user-dto";
import { NotFoundError } from "../../domain/errors/errors";
import { IValidator } from "../protocols/validate";
import { getCurrentUser } from "../guardars/get-current-user";

export class InviteUserController implements IController {
  constructor(
    private readonly inviteUserUseCase: IInviteUserUseCase,
    private readonly bodyValidator: IValidator<
      Omit<InviteUserDTO, "currentUser">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const currentUser = getCurrentUser(request);

    const { name, phone, role } = this.bodyValidator.validate(request.body);

    const dto: InviteUserDTO = {
      currentUser: currentUser,
      name: name,
      phone: phone,
      role: role,
    };
    return created((await this.inviteUserUseCase.execute(dto)).toJSON());
  }
}
