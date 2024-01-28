"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.route("/create-user").post(userController_1.createUser);
router.route("/verify-user/:userID").post(userController_1.verifyUser);
router.route("/sign-in-user/:userID").post(userController_1.signUser);
exports.default = router;
