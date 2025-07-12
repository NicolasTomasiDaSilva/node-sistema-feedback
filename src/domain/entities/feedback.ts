import { BadRequestError } from "../errors/errors";
import { Entity } from "./entity";
import { FeedbackItem } from "./feedback-item";
import { User } from "./user";

interface FeedbackProps {
  id: string;
  giver: User;
  receiver: User;
  title: string;
  description: string | null;
  observation: string | null;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  items: FeedbackItem[] | undefined;
}

export class Feedback extends Entity {
  private readonly _giver: User;
  private readonly _receiver: User;
  private _title: string;
  private _description: string | null;
  private _observation: string | null;
  private _score: number;
  private _items: FeedbackItem[] | undefined;
  private constructor(props: FeedbackProps) {
    if (props.score < 1 || props.score > 100) {
      throw new BadRequestError("Score must be between 1 and 100");
    }
    if (props.items && (props.items.length < 1 || props.items.length > 10)) {
      throw new BadRequestError(
        "Template Feedback must have between 1 and 10 items"
      );
    }

    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._giver = props.giver;
    this._receiver = props.receiver;
    this._title = props.title;
    this._description = props.description;
    this._observation = props.observation;
    this._score = props.score;
    this._items = props.items;
  }
  static create(
    props: Omit<FeedbackProps, "createdAt" | "updatedAt" | "deletedAt"> & {
      items: FeedbackItem[];
    }
  ): Feedback {
    const now = new Date();

    return new Feedback({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: FeedbackProps): Feedback {
    return new Feedback(props);
  }

  toJSON() {
    return {
      id: this.id,
      giver: this._giver.toJSON(),
      receiver: this._receiver.toJSON(),
      title: this._title,
      description: this._description,
      observation: this._observation,
      score: this._score,
      items: this._items ? this._items.map((item) => item.toJSON()) : undefined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  get giver(): User {
    return this._giver;
  }
  get receiver(): User {
    return this._receiver;
  }
  get title(): string {
    return this._title;
  }
  get description(): string | null {
    return this._description;
  }
  get observation(): string | null {
    return this._observation;
  }
  get score(): number {
    return this._score;
  }

  get items(): FeedbackItem[] | undefined {
    return this._items;
  }
}
