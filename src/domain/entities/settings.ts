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

  static create(
    props: Omit<SettingsProps, "createdAt" | "updatedAt" | "deletedAt">
  ): Settings {
    const now = new Date();
    return new Settings({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: SettingsProps): Settings {
    return new Settings(props);
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this._companyId,
      primaryColor: this._primaryColor,
      logoUrl: this._logoUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
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
