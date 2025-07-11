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
exports.CreateFeedbackController = void 0;
const get_current_user_1 = require("../guardars/get-current-user");
const http_responses_1 = require("../helpers/http-responses");
class CreateFeedbackController {
    constructor(createFeedbackUseCase, bodyValidator) {
        this.createFeedbackUseCase = createFeedbackUseCase;
        this.bodyValidator = bodyValidator;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = (0, get_current_user_1.getCurrentUser)(request);
            const data = this.bodyValidator.validate(request.body);
            const dto = Object.assign({ currentUser: currentUser }, data);
            return (0, http_responses_1.created)((yield this.createFeedbackUseCase.execute(dto)).toJSON());
        });
    }
}
exports.CreateFeedbackController = CreateFeedbackController;
//# sourceMappingURL=create-feedback-controller.js.map