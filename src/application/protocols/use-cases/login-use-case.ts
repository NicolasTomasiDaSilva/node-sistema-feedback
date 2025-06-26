import { AuthTokensDTO } from "../../dtos/auth-tokens";
import { LoginDTO } from "../../dtos/login-dto";

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<AuthTokensDTO>;
}
