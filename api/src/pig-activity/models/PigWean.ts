import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigWeanDocument extends PigActivityDocument {
  job: string;
  event: string;
  quantity: number;
  smallPigQuantity: number;
  totalWeight: number;
  comments: string;
}

const PigWeanSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  event: String,
  quantity: Number,
  smallPigQuantity: Number,
  totalWeight: Number,
  comments: String
});

const PigWeanModel = PigActivityModel.discriminator<PigWeanDocument>(
  "PigWean",
  PigWeanSchema,
  "wean"
);
export default PigWeanModel;
