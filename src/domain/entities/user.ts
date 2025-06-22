import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";
import { Feedback } from "./feedback";

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
}

export class User extends Entity {
  private _name: string;
  private _email: string;
  private _role: RoleEnum;
  private _feedbacks: Feedback[] | undefined;
  protected constructor({ id, name, email, role }: UserProps) {
    super({ id: id });
    this._name = name;
    this._email = email;
    this._role = role;
    this._feedbacks = [];
  }

  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }

  get role(): RoleEnum {
    return this._role;
  }
  get feedbacks(): Feedback[] | undefined {
    return this._feedbacks;
  }
}
