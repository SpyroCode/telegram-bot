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
exports.getUserByChatId = exports.getUserById = exports.getUser = void 0;
const user_1 = __importDefault(require("../db/models/user"));
const logger_1 = __importDefault(require("../logger"));
const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getUser';
    try {
        logger_1.default.info(`Started function ${functionName}`);
        const user = {
            firstName: '',
            lastName: '',
            telegramId: null,
            index: null,
            id: ''
        };
        let response;
        response = yield validateUserExist(data, user);
        if (response && !response.index) {
            response = yield user_1.default.create({
                firstName: data.firstName,
                lastName: data.lastName,
                telegramId: data.telegramId,
                index: yield generateUserIndex()
            });
        }
        user.id = response.id || '';
        user.index = response.index || null;
        user.telegramId = response.telegramId || null;
        user.firstName = response.firstName || '';
        user.lastName = response.lastName || '';
        return user;
    }
    catch (err) {
        logger_1.default.error(`Error for created Bot ${functionName}`);
        throw new Error(err);
    }
});
exports.getUser = getUser;
function validateUserExist(data, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const functionName = 'functions.generateUserIndex';
        try {
            const response = yield user_1.default.findOne({
                where: {
                    active: true,
                    telegramId: data.telegramId
                }
            });
            user.id = response && response.id || '';
            user.index = response && response.index || null;
            user.telegramId = response && response.telegramId || null;
            user.firstName = response && response.firstName || '';
            user.lastName = response && response.lastName || '';
            return user;
        }
        catch (err) {
            logger_1.default.error(`Error for validateUserExist ${functionName}`);
            throw new Error(err);
        }
    });
}
function generateUserIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        const functionName = 'functions.generateUserIndex';
        try {
            const { count } = yield user_1.default.findAndCountAll({ where: { active: true } });
            return count + 1;
        }
        catch (err) {
            logger_1.default.error(`Error for generateUserIndex ${functionName}`);
            throw new Error(err);
        }
    });
}
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getUser';
    try {
        return yield user_1.default.findByPk(userId);
    }
    catch (err) {
        logger_1.default.error(`Error for generateUserIndex ${functionName}`);
        throw new Error(err);
    }
});
exports.getUserById = getUserById;
const getUserByChatId = (telegramId) => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getUser';
    try {
        const user = yield user_1.default.findOne({ where: { active: true, telegramId } });
        return user;
    }
    catch (err) {
        logger_1.default.error(`Error for generateUserIndex ${functionName}`);
        throw new Error(err);
    }
});
exports.getUserByChatId = getUserByChatId;
//# sourceMappingURL=user.js.map