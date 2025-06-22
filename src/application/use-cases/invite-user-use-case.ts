import { Invitation } from "../../domain/entities/invitation";
import { InviteUserDTO } from "../dtos/invite-user-dto";
import { IInviteUserUseCase } from "../protocols/use-cases/invite-user-use-case";

export class InviteUserUseCase implements IInviteUserUseCase {
  execute(data: InviteUserDTO): Promise<Invitation> {
    return Promise.resolve(
      new Invitation({
        id: "1",
        name: data.name,
        role: data.role,
        companyId: "1",
      })
    );
  }
}
