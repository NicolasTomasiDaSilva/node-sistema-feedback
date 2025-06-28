import { Entity } from "./entity";

interface ChecklistItemProps {
  id: string;
  checklistId: string;
  label: string;
  description: string | null;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class ChecklistItem extends Entity {
  private readonly _checklistId: string;
  private _label: string;
  private _description: string | null;
  private _weight: number;

  constructor(props: ChecklistItemProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._checklistId = props.checklistId;
    this._label = props.label;
    this._description = props.description;
    this._weight = props.weight;
  }

  static create(
    props: Omit<ChecklistItemProps, "createdAt" | "updatedAt" | "deletedAt">
  ) {
    const now = new Date();
    return new ChecklistItem({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: ChecklistItemProps): ChecklistItem {
    return new ChecklistItem(props);
  }

  get checklistId(): string {
    return this._checklistId;
  }
  get label(): string {
    return this._label;
  }
  get description(): string | null {
    return this._description;
  }
  get weight(): number {
    return this._weight;
  }
}
