import { User } from "../../domain/entities/user";
import { RoleEnum } from "../../domain/enums/role-enum";
import { ForbiddenError } from "../../domain/errors/errors";
import { GetUsersDTO } from "../dtos/get-users-dto";
import { IUserRepository } from "../protocols/repositories/user-repository";

import { IGetUsersUseCase } from "../protocols/use-cases/get-users-use-case";
import { IUnitOfWork } from "../protocols/repositories/unit-of-work";

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: GetUsersDTO): Promise<User[]> {
    const { currentUser, page, perPage, name } = data;

    const requiredRoles: RoleEnum[] = [RoleEnum.manager, RoleEnum.supervisor];
    if (!requiredRoles.includes(data.currentUser.role)) {
      throw new ForbiddenError("Only managers and supervisors can get users");
    }

    return this.unitOfWork.getUserRepository().findAll({
      companyId: currentUser.companyId,
      page: page ?? 1,
      perPage: perPage ?? 5,
      name,
    });
  }
}
