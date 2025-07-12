import { Template } from "../../../domain/entities/template";
import { GetTemplateDTO } from "../../dtos/get-template-dto";

export interface IGetTemplateUseCase {
  execute(data: GetTemplateDTO): Promise<Template>;
}
