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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSearchIndex = exports.generateProductIndex = exports.generateUserIndex = void 0;
const user_1 = __importDefault(require("../db/models/user"));
const logger_1 = __importDefault(require("../logger"));
const generateUserIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'generateUserIndex';
    try {
        const { count } = yield user_1.default.findAndCountAll({ where: { active: true } });
        return count + 1;
    }
    catch (err) {
        logger_1.default.error(`Error for generateUserIndex ${functionName}`);
        throw new Error(err);
    }
});
exports.generateUserIndex = generateUserIndex;
const generateProductIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'generateProductIndex';
    try {
        const { count } = yield user_1.default.findAndCountAll({ where: { active: true } });
        return count + 1;
    }
    catch (err) {
        logger_1.default.error(`Error for generateUserIndex ${functionName}`);
        throw new Error(err);
    }
});
exports.generateProductIndex = generateProductIndex;
const generateSearchIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'generateSearchIndex';
    try {
        const { count } = yield user_1.default.findAndCountAll({ where: { active: true } });
        return count + 1;
    }
    catch (err) {
        logger_1.default.error(`Error for generateUserIndex ${functionName}`);
        throw new Error(err);
    }
});
exports.generateSearchIndex = generateSearchIndex;
//# sourceMappingURL=generateIndex.js.map