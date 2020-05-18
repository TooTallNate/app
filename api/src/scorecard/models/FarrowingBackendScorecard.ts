import { Schema, model, Document } from "mongoose";
import createScorecardEntrySchema, {
  ScorecardEntryDocument
} from "./ScorecardEntry";

const ScorecardEntrySchema = createScorecardEntrySchema(0, 10);

export interface FarrowingBackendScorecardDocument extends Document {
  area: string;
  operator: string;
  sows: ScorecardEntryDocument;
  piglets: ScorecardEntryDocument;
  feed: ScorecardEntryDocument;
  water: ScorecardEntryDocument;
  crate: ScorecardEntryDocument;
  room: ScorecardEntryDocument;
}

const entryConfig = {
  type: ScorecardEntrySchema,
  default: () => ({})
};

const FarrowingBackendScorecardSchema = new Schema(
  {
    area: {
      type: String,
      required: true,
      unique: true
    },
    operator: String,
    sows: entryConfig,
    piglets: entryConfig,
    feed: entryConfig,
    water: entryConfig,
    crate: entryConfig,
    room: entryConfig
  },
  {
    timestamps: true
  }
);

const FarrowingBackendScorecardModel = model<FarrowingBackendScorecardDocument>(
  "FarrowingBackendScorecard",
  FarrowingBackendScorecardSchema
);
export default FarrowingBackendScorecardModel;
