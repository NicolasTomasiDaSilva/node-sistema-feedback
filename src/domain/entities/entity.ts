interface EntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export abstract class Entity {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor({ id, createdAt, updatedAt, deletedAt }: EntityProps) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }
  get id(): string {
    return this._id;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get deletedAt(): Date | null {
    return this._deletedAt;
  }
}
