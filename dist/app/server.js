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
const express_1 = __importDefault(require("express"));
const started_1 = __importDefault(require("../app/routes/started"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./db/connection"));
const logger_1 = __importDefault(require("./logger"));
const bot_1 = __importDefault(require("./functions/bot"));
const schedule_1 = require("./helpers/schedule");
class Server {
    constructor() {
        this.paths = {
            home: '/'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.startBot();
        this.scheduleProcess();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const functionName = 'dbConnection';
            try {
                yield connection_1.default.authenticate();
                logger_1.default.info(`Success DataBase Connection ${functionName}`);
            }
            catch (error) {
                logger_1.default.error(`Error DataBase Connection ${functionName}`);
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('app/assets/html/index.html'));
    }
    routes() {
        this.app.get(this.paths.home, started_1.default);
    }
    startBot() {
        return __awaiter(this, void 0, void 0, function* () {
            const functionName = 'startBot';
            logger_1.default.info(`Started Bot ${functionName}`);
            yield (0, bot_1.default)();
        });
    }
    scheduleProcess() {
        const functionName = 'scheduleProcess';
        logger_1.default.info(`Started schedule ${functionName}`);
        (0, schedule_1.scheduleCron)();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on PORT ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map