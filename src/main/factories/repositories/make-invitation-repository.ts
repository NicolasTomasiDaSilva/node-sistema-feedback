import { IInvitationRepository } from "../../../application/protocols/repositories/invite-repository";
import { SequelizeInvitationRepository } from "../../../infrastructure/database/sequelize/repositories/sequelize-invitation-repository";

export function makeInvitationRepository(): IInvitationRepository {
  return new SequelizeInvitationRepository();
}
