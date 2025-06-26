import { AuthTokensDTO } from "../dtos/auth-tokens";
import { LoginDTO } from "../dtos/login-dto";
import { ITokenService } from "../protocols/services/token-service";
import { ILoginUseCase } from "../protocols/use-cases/login-use-case";

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly tokenService: ITokenService) {}
  execute(data: LoginDTO): Promise<AuthTokensDTO> {
    throw new Error("Method not implemented.");
  }
}
