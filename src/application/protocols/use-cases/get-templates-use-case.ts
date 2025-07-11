import { Template } from "../../../domain/entities/template";
import { GetTemplatesDTO } from "../../dtos/get-templates-dto";

export interface IGetTemplatesUseCase {
  execute(data: GetTemplatesDTO): Promise<Template[]>;
}
