import { Schema, model, Document } from "mongoose";

export interface PigActivityDocument extends Document {
  activity: string;
}

const PigActivitySchema = new Schema(
  {},
  {
    timestamps: true,
    discriminatorKey: "activity"
  }
);

const PigActivityModel = model<PigActivityDocument>(
  "PigActivity",
  PigActivitySchema
);
export default PigActivityModel;
