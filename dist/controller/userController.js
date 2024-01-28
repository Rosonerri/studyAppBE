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
exports.signUser = exports.verifyUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const user = yield userModel_1.default.create({
            email,
            Password: token,
        });
        return res.status(201).json({
            message: "User Created Successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.createUser = createUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const updateUser = yield userModel_1.default.findByIdAndUpdate(userID, { verify: true }, { new: true });
            return res.status(200).json({
                message: "User Verify",
                data: updateUser,
            });
        }
        else {
            return res.status(404).json({
                message: "Error Verifying User",
            });
        }
    }
    catch (error) {
        return res.status(200).json({
            message: "Error",
        });
    }
});
exports.verifyUser = verifyUser;
const signUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, Password } = req.body;
        const getUser = yield userModel_1.default.findOne({ email });
        if (getUser) {
            if (getUser.Password === Password) {
                if (getUser.verify) {
                    const encrypt = jsonwebtoken_1.default.sign({ id: getUser._id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    req.session.isAuth = true;
                    req.session.userID = getUser._id;
                    return res.status(200).json({
                        message: "welcome back",
                        data: encrypt,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Account has not yet been verified",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Error reading token",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error reading user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.signUser = signUser;
