"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scholarModel = new mongoose_1.Schema({
    totalTime: {
        type: String,
    },
    studyTime: {
        type: String
    },
    stretchTime: {
        type: Number,
        default: 0,
    },
    breakTime: {
        type: String,
    },
    breakDuration: {
        type: String,
    },
    studyDuration: {
        type: String,
    },
    studyHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "studyHistory",
        },
    ],
    student: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "student",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("scholar", scholarModel);
