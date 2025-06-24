import { IInviteUserRepository } from "../../../../application/protocols/repositories/invite-user-repository";
import { Invitation } from "../../../../domain/entities/invitation";

export class SequelizeInviteUserRepository implements IInviteUserRepository {
  create(data: Invitation): Promise<Invitation> {
    throw new Error("Method not implemented.");
  }
}
