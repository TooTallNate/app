import { Schema, model, Document } from "mongoose";
import { InclusivityMode } from "../graphql";

export interface UserSettingsDocument extends Document {
  username: string;
  livestockJob: string | null | undefined;
  location: string | null | undefined;
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
  menuOptions:
    | {
        mode: InclusivityMode;
        list: string[];
      }
    | null
    | undefined;
  postingGroups:
    | {
        mode: InclusivityMode;
        list: string[];
      }
    | null
    | undefined;
}

const UserSettingsSchema = new Schema(
  {
    subdomain: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    livestockJob: String,
    location: String,
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
    },
    menuOptions: {
      _id: false,
      mode: String,
      list: {
        type: [String]
      }
    },
    postingGroups: {
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

UserSettingsSchema.index({ subdomain: 1, username: 1 }, { unique: true });

const UserSettingsModel = model<UserSettingsDocument>(
  "UserSettings",
  UserSettingsSchema
);
export default UserSettingsModel;
