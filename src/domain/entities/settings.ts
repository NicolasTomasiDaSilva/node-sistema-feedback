import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";

interface SettingsProps {
  id: string;
  companyId: string;
  primaryColor: string;
  logoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Settings extends Entity {
  private readonly _companyId;
  private _primaryColor: string;
  private _logoUrl: string | null;
  constructor(props: SettingsProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._companyId = props.companyId;
    this._primaryColor = props.primaryColor;
    this._logoUrl = props.logoUrl;
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
