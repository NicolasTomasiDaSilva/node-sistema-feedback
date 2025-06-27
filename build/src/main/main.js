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
require("dotenv/config");
const server_1 = require("../presentation/server");
const sequelize_1 = require("../infrastructure/database/sequelize/sequelize");
const PORT = process.env.PORT || 3333;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize_1.Database.connect();
            server_1.app.listen(PORT, () => {
                console.log(`🚀 Server is running at http://localhost:${PORT}`);
            });
            process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
                console.log("👋 SIGINT signal received: closing HTTP server");
                yield sequelize_1.Database.disconnect();
                process.exit(0);
            }));
        }
        catch (err) {
            console.error("❌ Failed to start the server:", err);
            process.exit(1);
        }
    });
}
bootstrap();
