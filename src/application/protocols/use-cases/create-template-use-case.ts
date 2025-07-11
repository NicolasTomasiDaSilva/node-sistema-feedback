import { Template } from "../../../domain/entities/template";
import { CreateTemplateDTO } from "../../dtos/create-template-dto";

export interface ICreateTemplateUseCase {
  execute(data: CreateTemplateDTO): Promise<Template>;
}
