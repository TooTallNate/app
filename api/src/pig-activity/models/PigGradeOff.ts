import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigGradeOffDocument extends PigActivityDocument {
  job: string;
  event: string;
  quantities: {
    code: string;
    quantity: number;
  }[];
  pigWeight: number;
  comments: string;
}

const PigGradeOffSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  event: String,
  quantities: [
    {
      _id: false,
      code: String,
      quantity: Number
    }
  ],
  pigWeight: Number,
  comments: String
});

const PigGradeOffModel = PigActivityModel.discriminator<PigGradeOffDocument>(
  "PigGradeOff",
  PigGradeOffSchema,
  "gradeoff"
);
export default PigGradeOffModel;
