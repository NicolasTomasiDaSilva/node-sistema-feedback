"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeControllerErrorDecorator = makeControllerErrorDecorator;
const controller_error_decorator_1 = require("../../../presentation/decorators/controller-error-decorator");
function makeControllerErrorDecorator(controller) {
    return new controller_error_decorator_1.ControllerErrorDecorator(controller);
}
//# sourceMappingURL=make-controller-error-decorator.js.map