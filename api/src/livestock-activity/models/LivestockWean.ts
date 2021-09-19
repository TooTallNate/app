import LivestockActivityModel, {
  LivestockActivityDocument
} from "./LivestockActivity";
import { Schema } from "mongoose";

export interface LivestockWeanDocument extends LivestockActivityDocument {
  job: string;
  event: string;
  quantity: number;
  smallLivestockQuantity: number;
  totalWeight: number;
  comments: string;
}

const LivestockWeanSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  event: String,
  quantity: Number,
  smallLivestockQuantity: Number,
  totalWeight: Number,
  comments: String
});

const LivestockWeanModel = LivestockActivityModel.discriminator<
  LivestockWeanDocument
>("LivestockWean", LivestockWeanSchema, "wean");
export default LivestockWeanModel;
