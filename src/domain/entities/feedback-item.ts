import { Entity } from "./entity";

interface FeedbackItemProps {
  id: string;
  feedbackId: string;
  observation: string | null;
  score: number;
  label: string;
  description: string | null;
  weight: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class FeedbackItem extends Entity {
  private readonly _feedbackId: string;
  private _observation: string | null;
  private _score: number;
  private _label: string;
  private _description: string | null;
  private _weight: number;
  private _order: number;

  private constructor(props: FeedbackItemProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._feedbackId = props.feedbackId;
    this._observation = props.observation;
    this._score = props.score;
    this._label = props.label;
    this._description = props.description;
    this._weight = props.weight;
    this._order = props.order;
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
      observation: this._observation,
      score: this._score,
      label: this._label,
      description: this._description,
      weight: this._weight,
      order: this._order,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  get feedbackId(): string {
    return this._feedbackId;
  }

  get score(): number {
    return this._score;
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

  get observation(): string | null {
    return this._observation;
  }
}
