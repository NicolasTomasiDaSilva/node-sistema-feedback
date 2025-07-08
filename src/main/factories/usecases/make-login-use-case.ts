import { ILoginUseCase } from "../../../application/protocols/use-cases/login-use-case";
import { LoginUseCase } from "../../../application/use-cases/login-use-case";
import { JwtTokenServiceAdapter } from "../../../infrastructure/adapters/jwt-token-service-adapter";
import { makeUnitOfWork } from "../repositories/make-unit-of-work";

export function makeLoginUseCase(): ILoginUseCase {
  const tokenService = new JwtTokenServiceAdapter();
  const unitOfWork = makeUnitOfWork();
  return new LoginUseCase(unitOfWork, tokenService);
}
