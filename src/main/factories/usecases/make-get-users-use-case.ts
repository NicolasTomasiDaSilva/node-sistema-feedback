import { GetUsersUseCase } from "../../../application/use-cases/get-users-use-case";
import { makeUserRepository } from "../repositories/make-user-repository";

export const makeGetUsersUseCase = (): GetUsersUseCase => {
  const userRepository = makeUserRepository();
  return new GetUsersUseCase(userRepository);
};
