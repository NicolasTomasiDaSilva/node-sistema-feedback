import { Entity } from "./entity";

interface ChecklistProps {
  id: string;
  companyId: string;
  tittle: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Checklist extends Entity {
  private readonly _companyId: string;
  private _tittle: string;

  constructor(props: ChecklistProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    this._companyId = props.companyId;
    this._tittle = props.tittle;
  }

  get companyId(): string {
    return this._companyId;
  }
  get tittle(): string {
    return this._tittle;
  }
}
