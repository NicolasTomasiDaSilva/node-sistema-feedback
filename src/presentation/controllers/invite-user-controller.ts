import { badRequest, ok, serverError } from "../helpers/http-responses";
import { IController } from "../protocols/controller";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/htpp-response";
import { IInviteUserUseCase } from "../../application/protocols/use-cases/invite-user-use-case";
import { InviteUserDTO } from "../../application/dtos/invite-user-dto";
import { NotFoundError } from "../../domain/errors/errors";
import { IValidator } from "../protocols/validate";

export class InviteUserController implements IController {
  constructor(
    private readonly inviteUserUseCase: IInviteUserUseCase,
    private readonly bodyValidator: IValidator<
      Omit<InviteUserDTO, "userId" | "companyId">
    >
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const id = request.user?.id;
    const companyId = request.user?.companyId;
    if (!id) {
      throw new NotFoundError("User not found");
    }
    if (!companyId) {
      throw new NotFoundError("Company not found");
    }

    const { name, role } = this.bodyValidator.validate(request.body);

    const dto: InviteUserDTO = {
      userId: id,
      companyId: companyId,
      name: name,
      role: role,
    };
    return ok(await this.inviteUserUseCase.execute(dto));
  }
}
