import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigMortalityDocument extends PigActivityDocument {
  job: string;
  animal: string;
  naturalQuantity: number;
  euthanizedQuantity: number;
  totalWeight: number;
  comments: string;
}

const PigMortalitySchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  animal: String,
  naturalQuantity: Number,
  euthanizedQuantity: Number,
  totalWeight: Number,
  comments: String
});

const PigMortalityModel = PigActivityModel.discriminator<PigMortalityDocument>(
  "PigMortality",
  PigMortalitySchema,
  "mortality"
);
export default PigMortalityModel;
