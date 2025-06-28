import { sign, verify, SignOptions } from "jsonwebtoken";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ITokenService } from "../../application/protocols/services/token-service";
import { User } from "../../domain/entities/user";
import { AuthTokensDTO } from "../../application/dtos/auth-tokens";
import { AuthenticatedUserDTO } from "../../application/dtos/authenticated-user-dto";
import { UnauthorizedError } from "../../domain/errors/errors";

export class JwtTokenServiceAdapter implements ITokenService {
  private readonly secret: string;
  private readonly accessOptions: SignOptions;
  private readonly refreshOptions: SignOptions;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secrets not found.");
    }

    this.secret = process.env.JWT_SECRET;

    const accessExpiresSec = Number(process.env.JWT_ACCESS_EXPIRES_SEC) || 900;
    const refreshExpiresSec =
      Number(process.env.JWT_REFRESH_EXPIRES_SEC) || 7 * 24 * 3600;

    this.accessOptions = {
      expiresIn: accessExpiresSec,
      issuer: process.env.JWT_ISSUER,
    };
    this.refreshOptions = {
      expiresIn: refreshExpiresSec,
      issuer: process.env.JWT_ISSUER,
    };
  }

  generateTokens(user: User): AuthTokensDTO {
    const payload: AuthenticatedUserDTO = {
      id: user.id,
      companyId: user.companyId,
      role: user.role,
    };

    const accessToken = sign(payload, this.secret, this.accessOptions);
    const refreshToken = sign(payload, this.secret, this.refreshOptions);

    return { accessToken, refreshToken };
  }

  verifyToken(token: string): AuthenticatedUserDTO {
    try {
      return verify(token, this.secret) as AuthenticatedUserDTO;
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired token");
    }
  }
}
