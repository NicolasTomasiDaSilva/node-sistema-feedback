import { HttpRequest } from "../types/http-request";
import { UnauthorizedError, NotFoundError } from "../../domain/errors/errors";
import { AuthenticatedUserDTO } from "../../application/dtos/authenticated-user-dto";

export function getCurrentUser(request: HttpRequest): AuthenticatedUserDTO {
  const user = request.user as Partial<AuthenticatedUserDTO> | undefined;

  if (!user) throw new UnauthorizedError("Not authenticated");
  if (!user.id) throw new NotFoundError("User not found");
  if (!user.companyId) throw new NotFoundError("Company not found");

  return user as AuthenticatedUserDTO;
}
