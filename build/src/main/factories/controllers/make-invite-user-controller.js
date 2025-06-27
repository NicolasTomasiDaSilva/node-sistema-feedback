"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInviteUserController = makeInviteUserController;
const role_enum_1 = require("../../../domain/enums/role-enum");
const invite_user_controller_1 = require("../../../presentation/controllers/invite-user-controller");
const make_controller_auth_decorator_1 = require("../decorators/make-controller-auth-decorator");
const make_controller_error_decorator_1 = require("../decorators/make-controller-error-decorator");
const make_invite_user_use_case_1 = require("../usecases/make-invite-user-use-case");
function makeInviteUserController() {
    const requiredRoles = [role_enum_1.RoleEnum.manager];
    const controller = new invite_user_controller_1.InviteUserController((0, make_invite_user_use_case_1.makeInviteUserUseCase)());
    return (0, make_controller_error_decorator_1.makeControllerErrorDecorator)((0, make_controller_auth_decorator_1.makeControllerAuthDecorator)(controller, requiredRoles));
}
