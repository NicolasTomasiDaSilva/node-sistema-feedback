import { BadRequestError } from "../errors/errors";
import { Entity } from "./entity";
import { TemplateItem } from "./template-item";
import { User } from "./user";

interface TemplateProps {
  id: string;
  title: string;
  creator: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  items: TemplateItem[] | undefined;
}

export class Template extends Entity {
  private _title: string;
  private _creator: User;
  private _items: TemplateItem[] | undefined;

  private constructor(props: TemplateProps) {
    if (props.items && (props.items.length < 1 || props.items.length > 10)) {
      throw new BadRequestError("Template must have between 1 and 10 items");
    }

    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._title = props.title;
    this._creator = props.creator;
    this._items = props.items;
  }

  static create(
    props: Omit<TemplateProps, "createdAt" | "updatedAt" | "deletedAt"> & {
      items: TemplateItem[];
    }
  ) {
    const now = new Date();
    return new Template({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: TemplateProps): Template {
    return new Template(props);
  }

  toJSON() {
    return {
      id: this.id,
      title: this._title,
      creator: this._creator.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      items: this._items ? this._items.map((item) => item.toJSON()) : undefined,
    };
  }

  get title(): string {
    return this._title;
  }
  get creator(): User {
    return this._creator;
  }
  get items(): TemplateItem[] | undefined {
    return this._items;
  }

  set items(items: TemplateItem[]) {
    if (items.length < 1 || items.length > 10) {
      throw new BadRequestError("Template must have between 1 and 10 items");
    }
    this._items = items;
    this.updated();
  }
  set title(title: string) {
    this._title = title;
    this.updated();
  }
}
