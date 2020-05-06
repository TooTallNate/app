import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigGradeOffDocument extends PigActivityDocument {
  job: string;
  animal: string;
  lameQuantity: number;
  respitoryQuantity: number;
  bellyRuptureQuantity: number;
  scrotumRuptureQuantity: number;
  scoursQuantity: number;
  smallQuantity: number;
  unthriftyQuantity: number;
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
  lameQuantity: Number,
  respitoryQuantity: Number,
  bellyRuptureQuantity: Number,
  scrotumRuptureQuantity: Number,
  scoursQuantity: Number,
  smallQuantity: Number,
  unthriftyQuantity: Number,
  weight: Number,
  comments: String
});

const PigGradeOffModel = PigActivityModel.discriminator<PigGradeOffDocument>(
  "PigGradeOff",
  PigGradeOffSchema,
  "gradeoff"
);
export default PigGradeOffModel;
