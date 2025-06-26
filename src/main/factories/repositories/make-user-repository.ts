import { IInvitationRepository } from "../../../application/protocols/repositories/invite-repository";
import { IUserRepository } from "../../../application/protocols/repositories/user-repository";
import { SequelizeInvitationRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-invitation-repository";
import { SequelizeUserRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-user-repository copy";

export function makeUserRepository(): IUserRepository {
  return new SequelizeUserRepository();
}
