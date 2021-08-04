import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigAdjustmentDocument extends PigActivityDocument {
  job: string;
  postingDate: String;
  event: string;
  quantity: number;
  totalWeight: number;
  comments: string;
  imagesUID: string;
}

const PigAdjustmentSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  event: String,
  quantity: Number,
  totalWeight: Number,
  comments: String,
  imagesUID: String
});

const PigAdjustmentModel = PigActivityModel.discriminator<
  PigAdjustmentDocument
>("PigAdjustment", PigAdjustmentSchema, "adjustment");
export default PigAdjustmentModel;
