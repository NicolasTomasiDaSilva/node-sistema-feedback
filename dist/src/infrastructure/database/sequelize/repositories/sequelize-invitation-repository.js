"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeInvitationRepository = void 0;
const invitation_mapper_1 = require("../mappers/invitation-mapper");
const invitation_1 = require("../models/invitation");
class SequelizeInvitationRepository {
    constructor(transaction) {
        this.transaction = transaction;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = invitation_mapper_1.InvitationMapper.toPersistence(data);
            const created = yield invitation_1.InvitationModel.create(model, {
                transaction: this.transaction,
            });
            return invitation_mapper_1.InvitationMapper.toEntity(created);
        });
    }
}
exports.SequelizeInvitationRepository = SequelizeInvitationRepository;
//# sourceMappingURL=sequelize-invitation-repository.js.map