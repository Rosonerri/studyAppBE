import { Schema, model, Document, Types } from "mongoose";

interface iUser {
  FullName: string;
  email: string;
  Password: string;
  verify: boolean;

  scholar: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
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
        type: Types.ObjectId,
        ref: "scholar",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("user", userModel);
