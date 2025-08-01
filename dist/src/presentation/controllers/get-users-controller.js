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
exports.GetUsersController = void 0;
const http_responses_1 = require("../helpers/http-responses");
const get_current_user_1 = require("../guardars/get-current-user");
class GetUsersController {
    constructor(getUsersUseCase, queryValidator) {
        this.getUsersUseCase = getUsersUseCase;
        this.queryValidator = queryValidator;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = (0, get_current_user_1.getCurrentUser)(request);
            const data = this.queryValidator.validate(request.query);
            const dto = Object.assign({ currentUser }, data);
            const users = yield this.getUsersUseCase.execute(dto);
            return (0, http_responses_1.ok)(users.map((user) => user.toJSON()));
        });
    }
}
exports.GetUsersController = GetUsersController;
//# sourceMappingURL=get-users-controller.js.map