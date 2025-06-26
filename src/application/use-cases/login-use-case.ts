import { User } from "../../domain/entities/user";
import { NotFoundError } from "../../domain/errors/errors";
import { AuthTokensDTO } from "../dtos/auth-tokens";
import { LoginDTO } from "../dtos/login-dto";
import { IUserRepository } from "../protocols/repositories/user-repository";
import { ITokenService } from "../protocols/services/token-service";
import { ILoginUseCase } from "../protocols/use-cases/login-use-case";

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService
  ) {}
  async execute(data: LoginDTO): Promise<AuthTokensDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new NotFoundError("Email not found");
    }
    return this.tokenService.generateTokens(user);
  }
}
