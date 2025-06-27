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
exports.expressRouteAdapter = expressRouteAdapter;
function expressRouteAdapter(controller) {
    return (request, response) => __awaiter(this, void 0, void 0, function* () {
        const { body } = request;
        const headers = {};
        Object.entries(request.headers).forEach(([key, value]) => {
            if (typeof value === "string") {
                headers[key] = value;
            }
            else if (Array.isArray(value) && value.length > 0) {
                headers[key] = value[0];
            }
        });
        const req = {
            body: body,
            headers: headers,
        };
        const res = yield controller.handle(req);
        response.status(res.status).json(res.body);
    });
}
