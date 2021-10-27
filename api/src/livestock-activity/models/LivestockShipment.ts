import LivestockActivityModel, {
  LivestockActivityDocument
} from "./LivestockActivity";
import { Schema } from "mongoose";

export interface LivestockShipmentDocument extends LivestockActivityDocument {
  job: string;
  event: string;
  quantity: number;
  deadsOnArrivalkQuantity: number;
  totalWeight: number;
  comments: string;
}

const LivestockShipmentSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  event: String,
  quantity: Number,
  deadsOnArrivalkQuantity: Number,
  totalWeight: Number,
  comments: String
});

const LivestockShipmentModel = LivestockActivityModel.discriminator<
  LivestockShipmentDocument
>("LivestockShipment", LivestockShipmentSchema, "shipment");
export default LivestockShipmentModel;
