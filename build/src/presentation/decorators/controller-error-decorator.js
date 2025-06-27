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
exports.ControllerErrorDecorator = void 0;
const errors_1 = require("../../domain/errors/errors");
const http_responses_1 = require("../helpers/http-responses");
class ControllerErrorDecorator {
    constructor(controller) {
        this.controller = controller;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.controller.handle(request);
            }
            catch (error) {
                if (error instanceof errors_1.BadRequestError) {
                    return (0, http_responses_1.badRequest)(error);
                }
                else if (error instanceof errors_1.NotFoundError) {
                    return (0, http_responses_1.notFound)(error);
                }
                else if (error instanceof errors_1.UnauthorizedError) {
                    return (0, http_responses_1.unauthorized)(error);
                }
                else if (error instanceof errors_1.ForbiddenError) {
                    return (0, http_responses_1.forbidden)(error);
                }
                else {
                    return (0, http_responses_1.serverError)(error);
                }
            }
        });
    }
}
exports.ControllerErrorDecorator = ControllerErrorDecorator;
