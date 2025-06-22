import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";
import { Invitation } from "./invitation";
import { Settings } from "./settings";

interface CompanyProps {
  id: string;
  name: string;
  cpfCnpj: string;
  settings: Settings;
}

export class Company extends Entity {
  private _name: string;
  private _cpfCnpj: string;
  private _settings: Settings | undefined;
  private _invitations: Invitation[] | undefined;
  protected constructor({ id, name, cpfCnpj, settings }: CompanyProps) {
    super({ id: id });
    this._name = name;
    this._cpfCnpj = cpfCnpj;
    this._settings = settings;
    this._invitations = [];
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
