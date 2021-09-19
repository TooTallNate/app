import LivestockActivityModel, {
  LivestockActivityDocument
} from "./LivestockActivity";
import { Schema } from "mongoose";

export interface LivestockMoveDocument extends LivestockActivityDocument {
  fromJob: string;
  toJob: string;
  event: string;
  postingDate: String;
  quantity: number;
  smallLivestockQuantity: number;
  totalWeight: number;
  comments: string;
}

const LivestockMoveSchema = new Schema({
  fromJob: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  toJob: String,
  event: String,
  quantity: Number,
  smallLivestockQuantity: Number,
  totalWeight: Number,
  comments: String
});

const LivestockMoveModel = LivestockActivityModel.discriminator<
  LivestockMoveDocument
>("LivestockMove", LivestockMoveSchema, "move");
export default LivestockMoveModel;
