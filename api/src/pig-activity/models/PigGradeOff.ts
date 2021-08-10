import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigGradeOffDocument extends PigActivityDocument {
  job: string;
  event: string;
  postingDate: String;
  quantities: {
    code: string;
    quantity: number;
  }[];
  pigWeight: number;
  comments: string;
  imagesUID: string;
}

const PigGradeOffSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  event: String,
  quantities: [
    {
      _id: false,
      code: String,
      quantity: Number
    }
  ],
  pigWeight: Number,
  comments: String,
  imagesUID: String
});

const PigGradeOffModel = PigActivityModel.discriminator<PigGradeOffDocument>(
  "PigGradeOff",
  PigGradeOffSchema,
  "gradeoff"
);
export default PigGradeOffModel;
