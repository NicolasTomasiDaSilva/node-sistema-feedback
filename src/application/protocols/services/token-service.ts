import { User } from "../../../domain/entities/user";
import { AuthTokensDTO } from "../../dtos/auth-tokens";
import { AuthenticatedUserDTO } from "../../dtos/authenticated-user-dto";

export interface ITokenService {
  generateTokens(user: User): AuthTokensDTO;
  verifyToken(token: string): AuthenticatedUserDTO;
}
