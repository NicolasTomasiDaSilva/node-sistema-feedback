import { RoleEnum } from "../enums/role-enum";
import { Checklist } from "./checklist";
import { Entity } from "./entity";

interface FeedbackProps {
  id: string;
  userId: string;
  checklistId: string;
  checklist: Checklist | undefined;
  tittle: string;
  description: string | null;
  observation: string | null;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Feedback extends Entity {
  private readonly _userId: string;
  private readonly _checklistId: string;
  private _checklist: Checklist | undefined;
  private _tittle: string;
  private _description: string | null;
  private _observation: string | null;
  private _score: number;
  constructor(props: FeedbackProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._userId = props.userId;
    this._checklistId = props.checklistId;
    this._checklist = props.checklist;
    this._tittle = props.tittle;
    this._description = props.description;
    this._observation = props.observation;
    this._score = props.score;
  }

  get userId(): string {
    return this._userId;
  }
  get checklistId(): string {
    return this._checklistId;
  }
  get checklist(): Checklist | undefined {
    return this._checklist;
  }
  get tittle(): string {
    return this._tittle;
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
