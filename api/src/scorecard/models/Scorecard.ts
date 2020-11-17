import { Schema, model, Document } from "mongoose";

export interface ScorecardDocument extends Document {
  job: string;
  operator: string;
  date: string;
}

const ScorecardSchema = new Schema(
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

const ScorecardModel = model<ScorecardDocument>("Scorecard", ScorecardSchema);
export default ScorecardModel;
