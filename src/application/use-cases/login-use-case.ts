import { NotFoundError } from "../../domain/errors/errors";
import { AuthTokensDTO } from "../dtos/auth-tokens-dto";
import { LoginDTO } from "../dtos/login-dto";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";
import { ITokenService } from "../protocols/services/token-service";
import { ILoginUseCase } from "../protocols/use-cases/login-use-case";

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly tokenService: ITokenService
  ) {}

  async execute(data: LoginDTO): Promise<AuthTokensDTO> {
    const user = await this.unitOfWork
      .getUserRepository()
      .findByEmail(data.email);
    if (!user) {
      throw new NotFoundError("Email not found");
    }
    return this.tokenService.generateTokens(user);
  }
}
