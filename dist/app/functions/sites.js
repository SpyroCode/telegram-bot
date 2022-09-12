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
exports.getSites = void 0;
const logger_1 = __importDefault(require("../logger"));
const sites_1 = __importDefault(require("../db/models/sites"));
const getSites = () => __awaiter(void 0, void 0, void 0, function* () {
    const functionName = 'functions.getSites';
    try {
        logger_1.default.info(`Started function ${functionName}`);
        const getSites = yield sites_1.default.findAll({
            attributes: ['code', 'url', 'configuration'],
            where: { active: true, enabled: true }
        });
        return getSites;
    }
    catch (err) {
        logger_1.default.error(`Error for created Bot ${functionName}`);
        throw new Error(err);
    }
});
exports.getSites = getSites;
//# sourceMappingURL=sites.js.map