import { Invitation } from "../../../domain/entities/invitation";

export interface IInviteUserRepository {
  create(data: Invitation): Promise<Invitation>;
}
