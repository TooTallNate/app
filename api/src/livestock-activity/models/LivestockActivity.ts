import { Schema, model, Document } from "mongoose";

export interface LivestockActivityDocument extends Document {
  activity: string;
}

const LivestockActivitySchema = new Schema(
  {},
  {
    timestamps: true,
    discriminatorKey: "activity"
  }
);

const LivestockActivityModel = model<LivestockActivityDocument>(
  "LivestockActivity",
  LivestockActivitySchema
);
export default LivestockActivityModel;
