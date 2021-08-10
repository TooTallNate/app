import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigPurchaseDocument extends PigActivityDocument {
  job: string;
  event: string;
  postingDate: String;
  quantity: number;
  smallPigQuantity: number;
  totalWeight: number;
  comments: string;
  imagesUID: string;
}

const PigPurchaseSchema = new Schema({
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
  comments: String,
  imagesUID: String
});

const PigPurchaseModel = PigActivityModel.discriminator<PigPurchaseDocument>(
  "PigPurchase",
  PigPurchaseSchema,
  "purchase"
);
export default PigPurchaseModel;
