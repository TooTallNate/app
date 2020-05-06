import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigWeanDocument extends PigActivityDocument {
  job: string;
  animal: string;
  quantity: number;
  smallPigQuantity: number;
  totalWeight: number;
  price: number;
  comments: string;
}

const PigWeanSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  animal: String,
  quantity: Number,
  smallPigQuantity: Number,
  totalWeight: Number,
  price: Number,
  comments: String
});

const PigWeanModel = PigActivityModel.discriminator<PigWeanDocument>(
  "PigWean",
  PigWeanSchema,
  "wean"
);
export default PigWeanModel;
