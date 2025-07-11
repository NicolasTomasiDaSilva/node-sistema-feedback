import { Template } from "../../../domain/entities/template";
import { UpdateTemplateDTO } from "../../dtos/update-template-dto";

export interface IUpdateTemplateUseCase {
  execute(data: UpdateTemplateDTO): Promise<Template>;
}
