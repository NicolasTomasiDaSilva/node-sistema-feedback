import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";

interface InvitationProps {
  id: string;
  companyId: string;
  name: string;
  role: RoleEnum;
}

export class Invitation extends Entity {
  private readonly _companyId: string;
  private _name: string;
  private _role: RoleEnum;
  private _isAccepted: boolean;
  protected constructor({ id, companyId, name, role }: InvitationProps) {
    super({ id: id });
    this._companyId = companyId;
    this._name = name;
    this._role = role;
    this._isAccepted = false;
  }

  get companyId(): string {
    return this._companyId;
  }
  get name(): string {
    return this._name;
  }
  get role(): RoleEnum {
    return this._role;
  }
  get isAccepted(): boolean {
    return this._isAccepted;
  }
}
