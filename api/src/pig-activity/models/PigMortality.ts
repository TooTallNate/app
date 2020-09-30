import PigActivityModel, { PigActivityDocument } from "./PigActivity";
import { Schema } from "mongoose";

export interface PigMortalityDocument extends PigActivityDocument {
  job: string;
  event: string;
  quantities: {
    code: string;
    quantity: number;
  }[];
  totalWeight: number;
  comments: string;
}

const PigMortalitySchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  event: String,
  quantities: [
    {
      _id: false,
      code: String,
      quantity: Number
    }
  ],
  totalWeight: Number,
  comments: String
});

const PigMortalityModel = PigActivityModel.discriminator<PigMortalityDocument>(
  "PigMortality",
  PigMortalitySchema,
  "mortality"
);
export default PigMortalityModel;
