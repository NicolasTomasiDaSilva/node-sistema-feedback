import { Entity } from "./entity";
import { Settings } from "./settings";

interface CompanyProps {
  id: string;
  name: string;
  cpfCnpj: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  settings: Settings | undefined;
}

export class Company extends Entity {
  private _name: string;
  private _cpfCnpj: string;
  private _settings: Settings | undefined;
  private constructor({
    id,
    name,
    cpfCnpj,
    settings,
    createdAt,
    updatedAt,
    deletedAt,
  }: CompanyProps) {
    super({ id, createdAt, updatedAt, deletedAt });
    this._name = name;
    this._cpfCnpj = cpfCnpj;
    this._settings = settings;
  }

  static create(
    props: Omit<CompanyProps, "createdAt" | "updatedAt" | "deletedAt">
  ): Company {
    const now = new Date();
    return new Company({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: CompanyProps): Company {
    return new Company(props);
  }

  toJSON() {
    return {
      id: this.id,
      name: this._name,
      cpfCnpj: this._cpfCnpj,
      settings: this._settings ? this._settings.toJSON() : undefined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  get name(): string {
    return this._name;
  }
  get cpfCnpj(): string {
    return this._cpfCnpj;
  }
  get settings(): Settings | undefined {
    return this._settings;
  }
}
