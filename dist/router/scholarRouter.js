"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scholarController_1 = require("../controller/scholarController");
const router = (0, express_1.Router)();
router.route("/create-scholar").post(scholarController_1.createScholar);
exports.default = router;
