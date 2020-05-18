import { Schema, model, Document } from "mongoose";

export interface UserSettingsDocument extends Document {
  username: string;
  pigJob: string | null | undefined;
  price: number | null | undefined;
  locations:
    | {
        listType: string;
        list: string[];
      }
    | null
    | undefined;
}

const UserSettingsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    pigJob: String,
    price: Number,
    locations: {
      _id: false,
      listType: String,
      list: [String]
    }
  },
  {
    timestamps: true
  }
);

const UserSettingsModel = model<UserSettingsDocument>(
  "UserSettings",
  UserSettingsSchema
);
export default UserSettingsModel;
