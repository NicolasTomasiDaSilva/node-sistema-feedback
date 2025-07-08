import { IUnitOfWork } from "../../../application/protocols/repositories/unit-of-work";
import { SequelizeUnitOfWork } from "../../../infrastructure/database/sequelize/unit-of-work";
import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";

export const makeUnitOfWork = (): IUnitOfWork => {
  const uuidGenerator = new UuidAdapter();
  return new SequelizeUnitOfWork(uuidGenerator);
};
