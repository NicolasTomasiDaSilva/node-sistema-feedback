import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";
import { Feedback } from "./feedback";

interface UserProps {
  id: string;
  companyId: string;
  name: string;
  cpf: string;
  email: string;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User extends Entity {
  private readonly _companyId: string;
  private _name: string;
  private _cpf: string;
  private _email: string;
  private _role: RoleEnum;

  private constructor(props: UserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._companyId = props.companyId;
    this._name = props.name;
    this._cpf = props.cpf;
    this._email = props.email;
    this._role = props.role;
  }

  static create(
    props: Omit<UserProps, "createdAt" | "updatedAt" | "deletedAt">
  ) {
    const now = new Date();
    return new User({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this._companyId,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      role: this._role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  get companyId(): string {
    return this._companyId;
  }
  get name(): string {
    return this._name;
  }

  get cpf(): string {
    return this._cpf;
  }
  get email(): string {
    return this._email;
  }

  get role(): RoleEnum {
    return this._role;
  }
}
