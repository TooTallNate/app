import LivestockActivityModel, {
  LivestockActivityDocument
} from "./LivestockActivity";
import { Schema } from "mongoose";

export interface LivestockMortalityDocument extends LivestockActivityDocument {
  job: string;
  event: string;
  postingDate: String;
  quantities: {
    code: string;
    quantity: number;
  }[];
  totalWeight: number;
  comments: string;
}

const LivestockMortalitySchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
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

const LivestockMortalityModel = LivestockActivityModel.discriminator<
  LivestockMortalityDocument
>("LivestockMortality", LivestockMortalitySchema, "mortality");
export default LivestockMortalityModel;
