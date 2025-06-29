import { Checklist } from "../../domain/entities/checklist";
import { ChecklistItem } from "../../domain/entities/checklist-item";
import { Invitation } from "../../domain/entities/invitation";
import { RoleEnum } from "../../domain/enums/role-enum";
import { BadRequestError, ForbiddenError } from "../../domain/errors/errors";
import { CreateChecklistDTO } from "../dtos/checklist/create-checklist-dto";
import { IChecklistRepository } from "../protocols/repositories/checklist-repository";
import { ICreateChecklistUseCase } from "../protocols/use-cases/create-checklist-use-case";
import { IUuidGenerator } from "../protocols/uuid-generator";

export class CreateChecklistUseCase implements ICreateChecklistUseCase {
  constructor(
    private readonly checklistRepository: IChecklistRepository,
    private readonly uuidGenerator: IUuidGenerator
  ) {}
  execute(data: CreateChecklistDTO): Promise<Checklist> {
    if (data.currentUser.role !== RoleEnum.manager) {
      throw new ForbiddenError("Only managers can create checklists");
    }
    if (!data.items.length) {
      throw new BadRequestError("Checklist must have at least one item");
    }

    const checklistId = this.uuidGenerator.generate();

    const checklist = Checklist.create({
      id: checklistId,
      companyId: data.currentUser.companyId,
      title: data.title,
      items: data.items.map((item) =>
        ChecklistItem.create({
          id: this.uuidGenerator.generate(),
          checklistId: checklistId,
          label: item.label,
          description: item.description,
          weight: item.weight,
        })
      ),
    });

    return this.checklistRepository.create(checklist);
  }
}
