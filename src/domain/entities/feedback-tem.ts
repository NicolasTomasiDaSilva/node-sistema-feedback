import { ChecklistItem } from "./checklist-item";
import { Entity } from "./entity";

interface FeedbackItemProps {
  id: string;
  feedbackId: string;
  checklistItemId: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  checklistItem: ChecklistItem;
}

export class FeedbackItem extends Entity {
  private readonly _feedbackId: string;
  private readonly _checklistItemId: string;
  private _isChecked: boolean;
  private _checklistItem: ChecklistItem;

  private constructor(props: FeedbackItemProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._feedbackId = props.feedbackId;
    this._checklistItemId = props.checklistItemId;
    this._isChecked = props.isChecked;
    this._checklistItem = props.checklistItem;
  }

  static create(
    props: Omit<FeedbackItemProps, "createdAt" | "updatedAt" | "deletedAt">
  ) {
    const now = new Date();
    return new FeedbackItem({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: FeedbackItemProps): FeedbackItem {
    return new FeedbackItem(props);
  }

  toJSON() {
    return {
      id: this.id,
      feedbackId: this._feedbackId,
      checklistItemId: this._checklistItemId,
      label: this.label,
      description: this.description,
      weight: this.weight,
      order: this.order,
      isChecked: this._isChecked,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  get feedbackId(): string {
    return this._feedbackId;
  }

  get checklistItemId(): string {
    return this._checklistItemId;
  }
  get isChecked(): boolean {
    return this._isChecked;
  }

  get label(): string {
    return this._checklistItem.label;
  }
  get description(): string | null {
    return this._checklistItem.description;
  }
  get weight(): number {
    return this._checklistItem.weight;
  }
  get order(): number {
    return this._checklistItem.order;
  }
}
