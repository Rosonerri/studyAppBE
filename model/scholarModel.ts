import { Document, Schema, Types, model } from "mongoose";

interface iScholar {
  totalTime: string;
  studyTime: string;
  breakTime: string;
  stretchTime: number;
  endStudy: boolean;
  studyDuration: string;
  studyHistory: Types.ObjectId[];
  student: Array<{}>;
  breakDuration: string;
}

interface iScholarData extends iScholar, Document {}

const scholarModel = new Schema<iScholarData>(
  {
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
        type: Types.ObjectId,
        ref: "studyHistory",
      },
    ],
    student: [
      {
        type: Types.ObjectId,
        ref: "student",
      },
    ],
  },
  { timestamps: true }
);

export default model<iScholarData>("scholar", scholarModel);
