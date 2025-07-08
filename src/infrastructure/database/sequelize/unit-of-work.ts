import { Transaction } from "sequelize";
import { IUnitOfWork } from "../../../application/protocols/repositories/unit-of-work";
import { IUserRepository } from "../../../application/protocols/repositories/user-repository";
import { IFeedbackRepository } from "../../../application/protocols/repositories/feedback-repository";
import { ITemplateFeedbackRepository } from "../../../application/protocols/repositories/template-feedback-repository";
import { IInvitationRepository } from "../../../application/protocols/repositories/invite-repository";
import { SequelizeUserRepository } from "./repositories/sequelize-user-repository";
import { SequelizeFeedbackRepository } from "./repositories/sequelize-feedback-repository ";
import { SequelizeTemplateFeedbackRepository } from "./repositories/sequelize-template-feedback-repository";
import { SequelizeInvitationRepository } from "./repositories/sequelize-invitation-repository";
import { Database } from "./sequelize";
import { IUuidGenerator } from "../../../application/protocols/uuid-generator";

export class SequelizeUnitOfWork implements IUnitOfWork {
  private transaction: Transaction | null = null;
  private _userRepository: IUserRepository | null = null;
  private _feedbackRepository: IFeedbackRepository | null = null;
  private _templateFeedbackRepository: ITemplateFeedbackRepository | null =
    null;
  private _invitationRepository: IInvitationRepository | null = null;

  constructor(private readonly uuidGenerator: IUuidGenerator) {}

  async start(): Promise<void> {
    if (this.transaction) {
      throw new Error("Transaction already started");
    }

    const sequelize = Database.getInstance();
    this.transaction = await sequelize.transaction();
  }

  async commit(): Promise<void> {
    if (!this.transaction) {
      throw new Error("No active transaction to commit");
    }

    await this.transaction.commit();
    this.transaction = null;
  }

  async rollback(): Promise<void> {
    if (!this.transaction) {
      throw new Error("No active transaction to rollback");
    }

    await this.transaction.rollback();
    this.transaction = null;
  }

  getUserRepository(): IUserRepository {
    if (!this._userRepository) {
      this._userRepository = new SequelizeUserRepository(
        this.transaction || undefined
      );
    }
    return this._userRepository;
  }

  getFeedbackRepository(): IFeedbackRepository {
    if (!this._feedbackRepository) {
      this._feedbackRepository = new SequelizeFeedbackRepository(
        this.uuidGenerator,
        this.transaction || undefined
      );
    }
    return this._feedbackRepository;
  }

  getTemplateFeedbackRepository(): ITemplateFeedbackRepository {
    if (!this._templateFeedbackRepository) {
      this._templateFeedbackRepository =
        new SequelizeTemplateFeedbackRepository(
          this.uuidGenerator,
          this.transaction || undefined
        );
    }
    return this._templateFeedbackRepository;
  }

  getInvitationRepository(): IInvitationRepository {
    if (!this._invitationRepository) {
      this._invitationRepository = new SequelizeInvitationRepository(
        this.transaction || undefined
      );
    }
    return this._invitationRepository;
  }
}
