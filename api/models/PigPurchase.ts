import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigPurchaseDocument extends PigActivityDocument {
  job: string;
  animal: string;
  quantity: number;
  weight: number;
  price: number;
  comments: string;
}

const PigPurchaseSchema = new Schema({
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

const PigPurchaseModel = PigActivityModel.discriminator<PigPurchaseDocument>(
  "PigPurchase",
  PigPurchaseSchema,
  "purchase"
);
export default PigPurchaseModel;
