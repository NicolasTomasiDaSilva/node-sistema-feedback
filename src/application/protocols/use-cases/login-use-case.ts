import { AuthTokensDTO } from "../../dtos/auth-tokens-dto";
import { LoginDTO } from "../../dtos/login-dto";

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<AuthTokensDTO>;
}
