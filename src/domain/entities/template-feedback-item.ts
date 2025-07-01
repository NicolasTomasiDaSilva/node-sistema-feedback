interface TemplateFeedbackItemProps {
  label: string;
  description: string | null;
  weight: number;
  order: number;
}

export class TemplateFeedbackItem {
  private _label: string;
  private _description: string | null;
  private _weight: number;
  private _order: number;

  private constructor(props: TemplateFeedbackItemProps) {
    this._label = props.label;
    this._description = props.description;
    this._weight = props.weight;
    this._order = props.order;
  }

  static create(props: TemplateFeedbackItemProps): TemplateFeedbackItem {
    return new TemplateFeedbackItem(props);
  }

  static fromPersistence(
    props: TemplateFeedbackItemProps
  ): TemplateFeedbackItem {
    return new TemplateFeedbackItem({
      label: props.label,
      description: props.description,
      weight: props.weight,
      order: props.order,
    });
  }

  toJSON() {
    return {
      label: this._label,
      description: this._description,
      weight: this._weight,
      order: this._order,
    };
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
