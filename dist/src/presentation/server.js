"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use(routes_1.router);
//# sourceMappingURL=server.js.map