import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";

interface SettingsProps {
  id: string;
  companyId: string;
  primaryColor: string;
  logoUrl: string | null;
}

export class Settings extends Entity {
  private readonly _companyId;
  private _primaryColor: string;
  private _logoUrl: string | null;
  protected constructor({
    id,
    companyId,
    primaryColor,
    logoUrl,
  }: SettingsProps) {
    super({ id: id });
    this._companyId = companyId;
    this._primaryColor = primaryColor;
    this._logoUrl = logoUrl ?? null;
  }

  get companyId(): string {
    return this._companyId;
  }

  get primaryColor(): string {
    return this._primaryColor;
  }
  get logoUrl(): string | null {
    return this._logoUrl;
  }
}
