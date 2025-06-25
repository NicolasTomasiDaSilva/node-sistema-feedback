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

  static create(
    props: Omit<ChecklistProps, "createdAt" | "updatedAt" | "deletedAt">
  ) {
    const now = new Date();
    return new Checklist({
      ...props,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
  }

  static fromPersistence(props: ChecklistProps): Checklist {
    return new Checklist(props);
  }

  get companyId(): string {
    return this._companyId;
  }
  get tittle(): string {
    return this._tittle;
  }
}
