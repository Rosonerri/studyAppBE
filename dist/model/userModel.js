"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    FullName: {
        type: String,
    },
    email: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    Password: {
        type: String,
    },
    scholar: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "scholar",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("user", userModel);
