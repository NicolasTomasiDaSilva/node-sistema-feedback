"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInviteUserController = makeInviteUserController;
const zod_adapter_1 = require("../../../infrastructure/adapters/zod-adapter");
const invite_user_schema_1 = require("../../../infrastructure/schemas/invite-user-schema");
const invite_user_controller_1 = require("../../../presentation/controllers/invite-user-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_invite_user_use_case_1 = require("../usecases/make-invite-user-use-case");
function makeInviteUserController() {
    const validator = new zod_adapter_1.ZodValidator(invite_user_schema_1.inviteUserSchema);
    const useCase = (0, make_invite_user_use_case_1.makeInviteUserUseCase)();
    const controller = new invite_user_controller_1.InviteUserController(useCase, validator);
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller));
}
//# sourceMappingURL=make-invite-user-controller.js.map