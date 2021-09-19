import LivestockActivityModel, {
  LivestockActivityDocument
} from "./LivestockActivity";
import { Schema } from "mongoose";

export interface LivestockPurchaseDocument extends LivestockActivityDocument {
  job: string;
  event: string;
  postingDate: String;
  quantity: number;
  smallLivestockQuantity: number;
  totalWeight: number;
  comments: string;
}

const LivestockPurchaseSchema = new Schema({
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

const LivestockPurchaseModel = LivestockActivityModel.discriminator<
  LivestockPurchaseDocument
>("LivestockPurchase", LivestockPurchaseSchema, "purchase");
export default LivestockPurchaseModel;
