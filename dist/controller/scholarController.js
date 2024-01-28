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
exports.createStudy = exports.createScholar = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const scholarModel_1 = __importDefault(require("../model/scholarModel"));
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const cron_1 = require("cron");
const createScholar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { name, studyTime, stretchTime } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const scholar = yield scholarModel_1.default.create({
                name,
                studyTime,
                stretchTime
            });
            user.scholar.push(new mongoose_1.Types.ObjectId(scholar._id));
            user.save();
            return res.status(201).json({
                message: "Scholar Created Successfully",
                scholar
            });
        }
        else {
            return res.status(404).json({
                message: "Error Creating Scholar",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.createScholar = createScholar;
const createStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { breakDuration, breakTime, studyDuration } = req.body;
        const { studentID } = req.params;
        const student = yield userModel_1.default.findById(studentID);
        if (!student) {
            return res.status(404).json({
                msg: "User not found",
                status: 404,
            });
        }
        const hourDuration = +studyDuration * 60;
        const breakNumber = hourDuration / (breakDuration + breakTime);
        const studyTime = hourDuration + breakNumber * breakDuration;
        const getMinutes = new Date().setMinutes(studyTime);
        const cronfor = (0, moment_1.default)(getMinutes).format("h:mm:ss a");
        const study = yield scholarModel_1.default.create({
            studyTime: `${studyTime} minutes`,
            breakDuration: ` ${breakDuration} minutes`,
            studyDuration: `${studyDuration} hours`,
        });
        const cron = new cron_1.CronJob(`${cronfor.split(":")[1]} ${cronfor.split(":")[0]} * * *`, function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("Start Break");
                yield scholarModel_1.default.findByIdAndUpdate(study._id, { endStudy: true, studyPoint: +studyDuration }, { new: true });
                // student!.studyTime! = student?.studyTime + +studyDuration;
                student === null || student === void 0 ? void 0 : student.save();
                // console.log("true");
                cron.stop();
            });
        }, null, true, "America/Los_Angeles");
        console.log("study._id:", study._id);
        student === null || student === void 0 ? void 0 : student.save();
        cron.start();
        return res.status(201).json({
            msg: "Study created",
            data: study,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "Error creating study",
            status: 404,
        });
    }
});
exports.createStudy = createStudy;
