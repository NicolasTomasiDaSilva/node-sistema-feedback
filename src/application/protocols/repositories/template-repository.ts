import { Template } from "../../../domain/entities/template";

export interface ITemplateRepository {
  create(data: Template, companyId: string): Promise<Template>;
  findById(id: string, companyId: string): Promise<Template | null>;
  update(data: Template, companyId: string): Promise<Template>;

  findAll({
    companyId,
    page,
    perPage,
  }: {
    companyId: string;
    page: number;
    perPage: number;
  }): Promise<Template[]>;
}
