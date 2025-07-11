"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidAdapter = void 0;
const uuid_1 = require("uuid");
class UuidAdapter {
    generate() {
        return (0, uuid_1.v4)();
    }
}
exports.UuidAdapter = UuidAdapter;
//# sourceMappingURL=uuid-adapter.js.map