import { User } from "../../../domain/entities/user";
import { AuthTokensDTO } from "../../dtos/auth-tokens";
import { TokenPayloadDTO } from "../../dtos/token-payload-dto";

export interface ITokenService {
  generateTokens(user: User): AuthTokensDTO;
  verifyToken(token: string): TokenPayloadDTO | false;
}
