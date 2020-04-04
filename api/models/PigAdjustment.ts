import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigAdjustmentDocument extends PigActivityDocument {
  job: string;
  animal: string;
  quantity: number;
  weight: number;
  price: number;
  comments: string;
}

const PigAdjustmentSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  animal: String,
  quantity: Number,
  weight: Number,
  price: Number,
  comments: String
});

const PigAdjustmentModel = PigActivityModel.discriminator<
  PigAdjustmentDocument
>("PigAdjustment", PigAdjustmentSchema, "adjustment");
export default PigAdjustmentModel;
