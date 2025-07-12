import { Template } from "../../../domain/entities/template";

export interface ITemplateRepository {
  create(data: Template, companyId: string): Promise<Template>;
  findById(id: string, companyId: string): Promise<Template | null>;
  update(data: Template, companyId: string): Promise<Template>;

  findAll({
    companyId,
    page,
    perPage,
    templateName,
  }: {
    companyId: string;
    page: number;
    perPage: number;
    templateName?: string;
  }): Promise<Template[]>;
}
