import { User } from "../../../domain/entities/user";
import { GetUsersDTO } from "../../dtos/get-users-dto";

export interface IGetUsersUseCase {
  execute(data: GetUsersDTO): Promise<User[]>;
}
