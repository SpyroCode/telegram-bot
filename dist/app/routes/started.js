"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getStarted_1 = require("../controllers/getStarted");
const router = (0, express_1.Router)();
router.get('/', getStarted_1.getStarted);
exports.default = router;
//# sourceMappingURL=started.js.map