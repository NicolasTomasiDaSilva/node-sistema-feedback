import { BadRequestError } from "../errors/errors";

interface TemplateItemProps {
  label: string;
  description: string | null;
  weight: number;
  order: number;
}

export class TemplateItem {
  private _label: string;
  private _description: string | null;
  private _weight: number;
  private _order: number;

  private constructor(props: TemplateItemProps) {
    if (props.weight < 1 || props.weight > 5) {
      throw new BadRequestError("Weight must be between 1 and 5");
    }
    this._label = props.label;
    this._description = props.description;
    this._weight = props.weight;
    this._order = props.order;
  }

  static create(props: TemplateItemProps): TemplateItem {
    return new TemplateItem(props);
  }

  static fromPersistence(props: TemplateItemProps): TemplateItem {
    return new TemplateItem({
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
