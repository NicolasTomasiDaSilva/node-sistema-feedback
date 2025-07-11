"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.Database = void 0;
// src/infrastructure/sequelize.ts
const sequelize_1 = require("sequelize");
const config = __importStar(require("./config/config"));
class Database {
    constructor() { }
    static getInstance() {
        if (!Database._instance) {
            Database._instance = new sequelize_1.Sequelize(config);
        }
        return Database._instance;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = Database.getInstance();
            yield sequelize.authenticate();
            console.log("Connected to database");
            const [{ CompanyModel }, { UserModel }, { InvitationModel }, { TemplateModel }, { TemplateItemModel }, { FeedbackModel }, { FeedbackItemModel },] = yield Promise.all([
                Promise.resolve().then(() => __importStar(require("./models/company"))),
                Promise.resolve().then(() => __importStar(require("./models/user"))),
                Promise.resolve().then(() => __importStar(require("./models/invitation"))),
                Promise.resolve().then(() => __importStar(require("./models/template"))),
                Promise.resolve().then(() => __importStar(require("./models/template-item"))),
                Promise.resolve().then(() => __importStar(require("./models/feedback"))),
                Promise.resolve().then(() => __importStar(require("./models/feedback-item"))),
            ]);
            CompanyModel.initModel(sequelize);
            UserModel.initModel(sequelize);
            InvitationModel.initModel(sequelize);
            FeedbackModel.initModel(sequelize);
            FeedbackItemModel.initModel(sequelize);
            TemplateModel.initModel(sequelize);
            TemplateItemModel.initModel(sequelize);
            CompanyModel.associate();
            UserModel.associate();
            InvitationModel.associate();
            TemplateModel.associate();
            TemplateItemModel.associate();
            FeedbackModel.associate();
            FeedbackItemModel.associate();
            yield sequelize.sync({
                alter: true,
            });
            console.log("All models were synchronized successfully.");
        });
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = Database._instance) === null || _a === void 0 ? void 0 : _a.close());
            console.log("Disconnected from database");
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=sequelize.js.map