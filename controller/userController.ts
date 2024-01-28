import { Request, Response } from "express";
import userModel from "../model/userModel";
import crypto from "crypto";
import jwt from "jsonwebtoken";


export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(3).toString("hex");
    const user = await userModel.create({
      email,
      Password: token,
    });

    return res.status(201).json({
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    if (user) {
      const updateUser = await userModel.findByIdAndUpdate(
        userID,
        { verify: true },
        { new: true }
      );
      return res.status(200).json({
        message: "User Verify",
        data: updateUser,
      });
    } else {
      return res.status(404).json({
        message: "Error Verifying User",
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Error",
    });
  }
};

export const signUser = async (req: any, res: Response) => {
  try {
    const { email, Password } = req.body;

    const getUser = await userModel.findOne({ email });

    if (getUser) {
      if (getUser.Password === Password) {
        if (getUser.verify) {
          const encrypt = jwt.sign(
            { id: getUser._id },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1d",
            }
          );

          req.session.isAuth = true;
          req.session.userID = getUser._id;

          return res.status(200).json({
            message: "welcome back",
            data: encrypt,
          });
        } else {
          return res.status(404).json({
            message: "Account has not yet been verified",
          });
        }
      } else {
        return res.status(404).json({
          message: "Error reading token",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error reading user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};
