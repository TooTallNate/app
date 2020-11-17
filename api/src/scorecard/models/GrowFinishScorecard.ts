import { Schema, model, Document } from "mongoose";

export interface GrowFinishScorecardDocument extends Document {
  job: string;
  operator: string;
  date: string;
}

const GrowFinishScorecardSchema = new Schema(
  {
    area: {
      type: String,
      require: true,
      unique: true
    },
    operator: String
  },
  {
    timestamps: true
  }
);

const GrowFinishScorecardModel = model<GrowFinishScorecardDocument>(
  "GrowFinishScorecard",
  GrowFinishScorecardSchema
);
export default GrowFinishScorecardModel;
