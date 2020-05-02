import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigGradeOffDocument extends PigActivityDocument {
  job: string;
  animal: string;
  quantity: number;
  weight: number;
  comments: string;
}

const PigGradeOffSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  animal: String,
  quantity: Number,
  weight: Number,
  comments: String
});

const PigGradeOffModel = PigActivityModel.discriminator<PigGradeOffDocument>(
  "PigGradeOff",
  PigGradeOffSchema,
  "gradeoff"
);
export default PigGradeOffModel;
