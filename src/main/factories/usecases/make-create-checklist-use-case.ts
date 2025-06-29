import { ICreateChecklistUseCase } from "../../../application/protocols/use-cases/create-checklist-use-case";
import { CreateChecklistUseCase } from "../../../application/use-cases/create-checklist-use-case";

import { UuidAdapter } from "../../../infrastructure/adapters/uuid-adapter";
import { makeChecklistRepository } from "../repositories/make-checklist-repository";

export function makeCreateChecklistUseCase(): ICreateChecklistUseCase {
  const uuidAdapter = new UuidAdapter();
  return new CreateChecklistUseCase(makeChecklistRepository(), uuidAdapter);
}
