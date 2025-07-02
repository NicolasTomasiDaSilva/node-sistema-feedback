import { TemplateFeedbackItem } from "./template-feedback-item";
import { Entity } from "./entity";

interface TemplateFeedbackProps {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  items: TemplateFeedbackItem[] | undefined;
}

export class TemplateFeedback extends Entity {
  private _title: string;
  private _items: TemplateFeedbackItem[] | undefined;

  private constructor(props: TemplateFeedbackProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._title = props.title;
    this._items = props.items;
  }

  static create(
    props: Omit<
      TemplateFeedbackProps,
      "createdAt" | "updatedAt" | "deletedAt"
    > & {
      items: TemplateFeedbackItem[];
    }
  ) {
    const now = new Date();
    return new TemplateFeedback({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: TemplateFeedbackProps): TemplateFeedback {
    return new TemplateFeedback(props);
  }

  toJSON() {
    return {
      id: this.id,
      title: this._title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      items: this._items ? this._items.map((item) => item.toJSON()) : undefined,
    };
  }
  get title(): string {
    return this._title;
  }
  get items(): TemplateFeedbackItem[] | undefined {
    return this._items;
  }

  set items(items: TemplateFeedbackItem[] | undefined) {
    this._items = items;
  }
}
