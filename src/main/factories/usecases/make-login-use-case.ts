import { ILoginUseCase } from "../../../application/protocols/use-cases/login-use-case";
import { LoginUseCase } from "../../../application/use-cases/login-use-case";
import { JwtTokenServiceAdapter } from "../../../infrastructure/adapters/jwt-token-service-adapter";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";

import { makeInvitationRepository } from "../repositories/make-invitation-repository";
import { makeUserRepository } from "../repositories/make-user-repository";

export function makeLoginUseCase(): ILoginUseCase {
  const tokenService = new JwtTokenServiceAdapter();
  return new LoginUseCase(makeUserRepository(), tokenService);
}
