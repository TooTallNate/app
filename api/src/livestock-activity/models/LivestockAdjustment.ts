import LivestockActivityModel, {
  LivestockActivityDocument
} from "./LivestockActivity";
import { Schema } from "mongoose";

export interface LivestockAdjustmentDocument extends LivestockActivityDocument {
  job: string;
  postingDate: String;
  event: string;
  quantity: number;
  totalWeight: number;
  comments: string;
}

const LivestockAdjustmentSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  event: String,
  quantity: Number,
  totalWeight: Number,
  comments: String
});

const LivestockAdjustmentModel = LivestockActivityModel.discriminator<
  LivestockAdjustmentDocument
>("LivestockAdjustment", LivestockAdjustmentSchema, "adjustment");
export default LivestockAdjustmentModel;
