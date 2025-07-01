interface FeedbackItemProps {
  observation: string | null;
  score: number;
  label: string;
  description: string | null;
  weight: number;
  order: number;
}

export class FeedbackItem {
  private _observation: string | null;
  private _score: number;
  private _label: string;
  private _description: string | null;
  private _weight: number;
  private _order: number;

  private constructor(props: FeedbackItemProps) {
    this._observation = props.observation;
    this._score = props.score;
    this._label = props.label;
    this._description = props.description;
    this._weight = props.weight;
    this._order = props.order;
  }

  static create(props: FeedbackItemProps): FeedbackItem {
    return new FeedbackItem(props);
  }

  static fromPersistence(
    props: FeedbackItemProps & {
      id: string;
      feedbackId: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    }
  ): FeedbackItem {
    return new FeedbackItem({
      observation: props.observation,
      score: props.score,
      label: props.label,
      description: props.description,
      weight: props.weight,
      order: props.order,
    });
  }

  toJSON() {
    return {
      observation: this._observation,
      score: this._score,
      label: this._label,
      description: this._description,
      weight: this._weight,
      order: this._order,
    };
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
