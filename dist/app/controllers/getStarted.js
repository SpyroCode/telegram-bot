"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStarted = void 0;
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../logger"));
const getStarted = (req, res) => {
    const functionName = 'getStarted';
    logger_1.default.info(`started ${functionName}`);
    res.sendFile(path_1.default.join(__dirname, '../assets/html/index.html'));
};
exports.getStarted = getStarted;
//# sourceMappingURL=getStarted.js.map