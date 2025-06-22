import { RoleEnum } from "../enums/role-enum";
import { Checklist } from "./checklist";
import { Entity } from "./entity";

interface FeedbackProps {
  id: string;
  userId: string;
  checklistId: string;
  checklist: Checklist;
  tittle: string;
  description: string | null;
  observation: string | null;
  score: number;
}

export class Feedback extends Entity {
  private readonly _userId: string;
  private readonly _checklistId: string;
  private _checklist: Checklist;
  private _tittle: string;
  private _description: string | null;
  private _observation: string | null;
  private _score: number;
  protected constructor({
    id,
    userId,
    checklistId,
    checklist,
    tittle,
    description,
    observation,
    score,
  }: FeedbackProps) {
    super({ id: id });
    this._userId = userId;
    this._checklistId = checklistId;
    this._checklist = checklist;
    this._tittle = tittle;
    this._description = description ?? null;
    this._observation = observation ?? null;
    this._score = score;
  }

  get userId(): string {
    return this._userId;
  }
  get checklistId(): string {
    return this._checklistId;
  }
  get checklist(): Checklist {
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
