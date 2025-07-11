import { IFeedbackRepository } from "./feedback-repository";
import { IInvitationRepository } from "./invite-repository";
import { ITemplateFeedbackRepository } from "./template-feedback-repository";
import { IUserRepository } from "./user-repository";

export interface IUnitOfWork {
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getUserRepository(): IUserRepository;
  getFeedbackRepository(): IFeedbackRepository;
  getTemplateFeedbackRepository(): ITemplateFeedbackRepository;
  getInvitationRepository(): IInvitationRepository;
}
