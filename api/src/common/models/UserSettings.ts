import { Schema, model, Document } from "mongoose";
import { InclusivityMode } from "../graphql";

export interface UserSettingsDocument extends Document {
  username: string;
  pigJob: string | null | undefined;
  price: number | null | undefined;
  prices: {
    animal: string;
    price: number | null | undefined;
  }[];
  locations:
    | {
        mode: InclusivityMode;
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
    prices: [
      {
        _id: false,
        animal: String,
        price: Number
      }
    ],
    locations: {
      _id: false,
      mode: String,
      list: {
        type: [String]
      }
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
