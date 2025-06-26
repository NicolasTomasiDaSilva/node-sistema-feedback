import { Invitation } from "../../../domain/entities/invitation";

export interface IInvitationRepository {
  create(data: Invitation): Promise<Invitation>;
}
