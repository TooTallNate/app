import { Schema, model, Document } from "mongoose";

export interface FarmConfigDocument extends Document {
  subdomain: string;
  url: string;
  user: string;
  accessKey: string;
}

const FarmConfigSchema = new Schema(
  {
    subdomain: {
      type: String,
      required: true,
      unique: true
    },
    url: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    accessKey: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const FarmConfigModel = model<FarmConfigDocument>(
  "FarmConfig",
  FarmConfigSchema
);
export default FarmConfigModel;
