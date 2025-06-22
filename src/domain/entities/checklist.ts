import { Entity } from "./entity";

interface ChecklistProps {
  id: string;
  companyId: string;
  tittle: string;
}

export class Checklist extends Entity {
  private readonly _companyId: string;
  private _tittle: string;

  constructor({ id, companyId, tittle }: ChecklistProps) {
    super({ id: id });
    this._companyId = companyId;
    this._tittle = tittle;
  }

  get companyId(): string {
    return this._companyId;
  }
  get tittle(): string {
    return this._tittle;
  }
}
