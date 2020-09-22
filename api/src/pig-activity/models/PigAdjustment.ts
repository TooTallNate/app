import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigAdjustmentDocument extends PigActivityDocument {
  job: string;
  event: string;
  quantity: number;
  totalWeight: number;
  price: number;
  comments: string;
}

const PigAdjustmentSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  event: String,
  quantity: Number,
  totalWeight: Number,
  price: Number,
  comments: String
});

const PigAdjustmentModel = PigActivityModel.discriminator<
  PigAdjustmentDocument
>("PigAdjustment", PigAdjustmentSchema, "adjustment");
export default PigAdjustmentModel;
