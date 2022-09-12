"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { timestamp, errors, printf } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    level: 'debug',
    format: winston_1.format.combine(timestamp({
        format: 'YYYY-MM-DDTHH:mm:ss'
    }), errors({ stack: true }), printf(({ timestamp, level, message }) => {
        return `${timestamp} | ${level} | ${message}`;
    })),
    transports: [
        new (winston_daily_rotate_file_1.default)({
            filename: './logs/application-error-%DATE%.log',
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new (winston_daily_rotate_file_1.default)({
            filename: './logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
    }));
}
exports.default = logger;
//# sourceMappingURL=index.js.map