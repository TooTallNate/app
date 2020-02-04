import { Schema, model, Document } from "mongoose";

export interface UserSettingsDocument extends Document {
  username: string;
  pigJob: string | null | undefined;
  price: number | null | undefined;
}

const UserSettingsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    pigJob: {
      type: String
    },
    price: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default model<UserSettingsDocument>("UserSettings", UserSettingsSchema);
