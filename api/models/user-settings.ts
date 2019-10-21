import { Schema, model, Document } from "mongoose";

export interface UserSettingsDocument extends Document {
  username: string;
  job: string | null | undefined;
}

const UserSettingsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    job: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model<UserSettingsDocument>("UserSettings", UserSettingsSchema);
