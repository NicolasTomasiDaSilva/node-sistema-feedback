import { IInviteUserRepository } from "../../../application/protocols/repositories/invite-user-repository";
import { SequelizeInviteUserRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-invite-user-repository";

export function makeInviteUserRepository(): IInviteUserRepository {
  return new SequelizeInviteUserRepository();
}
