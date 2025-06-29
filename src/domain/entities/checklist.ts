import { ChecklistItem } from "./checklist-item";
import { Entity } from "./entity";

interface ChecklistProps {
  id: string;
  companyId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  items?: ChecklistItem[] | undefined;
}

export class Checklist extends Entity {
  private readonly _companyId: string;
  private _title: string;
  private _items: ChecklistItem[] | undefined;

  private constructor(props: ChecklistProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._companyId = props.companyId;
    this._title = props.title;
    this._items = props.items;
  }

  static create(
    props: Omit<ChecklistProps, "createdAt" | "updatedAt" | "deletedAt">
  ) {
    const now = new Date();
    return new Checklist({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: ChecklistProps): Checklist {
    return new Checklist(props);
  }

  toJSON() {
    return {
      id: this.id,
      companyId: this._companyId,
      title: this._title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      items: this._items ? this._items.map((item) => item.toJSON()) : undefined,
    };
  }

  get companyId(): string {
    return this._companyId;
  }
  get title(): string {
    return this._title;
  }
  get items(): ChecklistItem[] | undefined {
    return this._items;
  }
}
