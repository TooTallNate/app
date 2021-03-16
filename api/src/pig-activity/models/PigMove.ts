import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigMoveDocument extends PigActivityDocument {
  fromJob: string;
  toJob: string;
  event: string;
  postingDate: String;
  quantity: number;
  smallPigQuantity: number;
  totalWeight: number;
  comments: string;
}

const PigMoveSchema = new Schema({
  fromJob: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  toJob: String,
  event: String,
  quantity: Number,
  smallPigQuantity: Number,
  totalWeight: Number,
  comments: String
});

const PigMoveModel = PigActivityModel.discriminator<PigMoveDocument>(
  "PigMove",
  PigMoveSchema,
  "move"
);
export default PigMoveModel;
