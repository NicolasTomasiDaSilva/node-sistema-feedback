import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";

interface InvitationProps {
  id: string;
  companyId: string;
  name: string;
  role: RoleEnum;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Invitation extends Entity {
  private readonly _companyId: string;
  private _name: string;
  private _role: RoleEnum;
  private _isAccepted: boolean;

  private constructor(props: InvitationProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._companyId = props.companyId;
    this._name = props.name;
    this._role = props.role;
    this._isAccepted = props.isAccepted;
  }

  static create(
    props: Omit<InvitationProps, "createdAt" | "updatedAt" | "deletedAt">
  ): Invitation {
    const now = new Date();
    return new Invitation({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: InvitationProps): Invitation {
    return new Invitation(props);
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
