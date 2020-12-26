import { Schema, model, Document } from "mongoose";

export interface ScorecardDocument extends Document {
  job: string;
  data: {
    elementId: string;
    numericValue: number;
    stringValue: string;
  }[];
}

const ScorecardSchema = new Schema(
  {
    job: {
      type: String,
      required: true,
      unique: true
    },
    data: [
      {
        elementId: {
          type: String,
          required: true
        },
        numericValue: Number,
        stringValue: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const ScorecardModel = model<ScorecardDocument>("Scorecard", ScorecardSchema);
export default ScorecardModel;
