interface SettingsProps {
  primaryColor: string | null;
  logoUrl: string | null;
}

export class Settings {
  private _primaryColor: string | null;
  private _logoUrl: string | null;
  private constructor(props: SettingsProps) {
    this._primaryColor = props.primaryColor;
    this._logoUrl = props.logoUrl;
  }

  static create(props: SettingsProps): Settings {
    return new Settings({
      ...props,
    });
  }

  static fromPersistence(props: SettingsProps): Settings {
    return new Settings(props);
  }

  toJSON() {
    return {
      primaryColor: this._primaryColor,
      logoUrl: this._logoUrl,
    };
  }

  get primaryColor(): string | null {
    return this._primaryColor;
  }
  get logoUrl(): string | null {
    return this._logoUrl;
  }
}
