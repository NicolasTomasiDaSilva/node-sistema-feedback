import { Entity } from "./entity";

interface TemplateFeedbackItemProps {
  id: string;
  templateFeedbackId: string;
  label: string;
  description: string | null;
  weight: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TemplateFeedbackItem extends Entity {
  private readonly _templateFeedbackId: string;
  private _label: string;
  private _description: string | null;
  private _weight: number;
  private _order: number;

  private constructor(props: TemplateFeedbackItemProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._templateFeedbackId = props.templateFeedbackId;
    this._label = props.label;
    this._description = props.description;
    this._weight = props.weight;
    this._order = props.order;
  }

  static create(
    props: Omit<
      TemplateFeedbackItemProps,
      "createdAt" | "updatedAt" | "deletedAt"
    >
  ) {
    const now = new Date();
    return new TemplateFeedbackItem({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(
    props: TemplateFeedbackItemProps
  ): TemplateFeedbackItem {
    return new TemplateFeedbackItem(props);
  }

  toJSON() {
    return {
      id: this.id,
      templateFeedbackId: this._templateFeedbackId,
      label: this._label,
      description: this._description,
      weight: this._weight,
      order: this._order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  get templateFeedbackId(): string {
    return this._templateFeedbackId;
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
  get order(): number {
    return this._order;
  }
}
