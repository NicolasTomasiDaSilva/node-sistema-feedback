import { RoleEnum } from "../enums/role-enum";
import { Entity } from "./entity";
import { Feedback } from "./feedback";

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  feedbacks: Feedback[] | undefined;
}

export class User extends Entity {
  private _name: string;
  private _email: string;
  private _role: RoleEnum;
  private _feedbacks: Feedback[] | undefined;

  constructor(props: UserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._name = props.name;
    this._email = props.email;
    this._role = props.role;
    this._feedbacks = props.feedbacks;
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

  fromPersistence(props: UserProps): User {
    return new User(props);
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
