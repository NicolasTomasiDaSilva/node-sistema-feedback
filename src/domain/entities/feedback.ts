import { RoleEnum } from "../enums/role-enum";
import { Checklist } from "./checklist";
import { Entity } from "./entity";

interface FeedbackProps {
  id: string;
  giverId: string;
  receiverId: string;
  checklistId: string;
  title: string;
  description: string | null;
  observation: string | null;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  checklist?: Checklist | undefined;
}

export class Feedback extends Entity {
  private readonly _giverId: string;
  private readonly _receiverId: string;
  private readonly _checklistId: string;
  private _title: string;
  private _description: string | null;
  private _observation: string | null;
  private _score: number;
  private _checklist: Checklist | undefined;
  constructor(props: FeedbackProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._giverId = props.giverId;
    this._receiverId = props.receiverId;
    this._checklistId = props.checklistId;
    this._checklist = props.checklist;
    this._title = props.title;
    this._description = props.description;
    this._observation = props.observation;
    this._score = props.score;
  }
  static create(
    props: Omit<FeedbackProps, "createdAt" | "updatedAt" | "deletedAt">
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
      giverId: this._giverId,
      receiverId: this._receiverId,
      checklistId: this._checklistId,
      title: this._title,
      description: this._description,
      observation: this._observation,
      score: this._score,
      checklist: this._checklist ? this._checklist.toJSON() : undefined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  get giverId(): string {
    return this._giverId;
  }
  get receiverId(): string {
    return this._receiverId;
  }
  get checklistId(): string {
    return this._checklistId;
  }
  get checklist(): Checklist | undefined {
    return this._checklist;
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
}
