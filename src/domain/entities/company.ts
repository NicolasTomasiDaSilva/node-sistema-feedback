import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";
import { Invitation } from "./invitation";
import { Settings } from "./settings";

interface CompanyProps {
  id: string;
  name: string;
  cpfCnpj: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  settings: Settings | undefined;
  invitations?: Invitation[] | undefined;
}

export class Company extends Entity {
  private _name: string;
  private _cpfCnpj: string;
  private _settings: Settings | undefined;
  private _invitations: Invitation[] | undefined;
  private constructor({
    id,
    name,
    cpfCnpj,
    settings,
    invitations,
    createdAt,
    updatedAt,
    deletedAt,
  }: CompanyProps) {
    super({ id, createdAt, updatedAt, deletedAt });
    this._name = name;
    this._cpfCnpj = cpfCnpj;
    this._settings = settings;
    this._invitations = invitations;
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

  get name(): string {
    return this._name;
  }
  get cpfCnpj(): string {
    return this._cpfCnpj;
  }
  get settings(): Settings | undefined {
    return this._settings;
  }
  get invitations(): Invitation[] | undefined {
    return this._invitations;
  }
}
