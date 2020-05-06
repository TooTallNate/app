import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigMoveDocument extends PigActivityDocument {
  fromJob: string;
  toJob: string;
  fromAnimal: string;
  toAnimal: string;
  quantity: number;
  smallPigQuantity: number;
  totalWeight: number;
  price: number;
  comments: string;
}

const PigMoveSchema = new Schema({
  fromJob: {
    type: String,
    required: true,
    unique: true
  },
  toJob: String,
  fromAnimal: String,
  toAnimal: String,
  quantity: Number,
  smallPigQuantity: Number,
  totalWeight: Number,
  price: Number,
  comments: String
});

const PigMoveModel = PigActivityModel.discriminator<PigMoveDocument>(
  "PigMove",
  PigMoveSchema,
  "move"
);
export default PigMoveModel;
