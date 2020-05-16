import { Schema, Document } from "mongoose";

export interface ScorecardEntryDocument extends Document {
  score: number;
  comments?: string;
}

function createScorecardEntrySchema(min: number, max: number) {
  return new Schema(
    {
      score: {
        type: Number,
        validate: {
          validator: (v: number) => v >= min && v <= max && v % 1 === 0,
          message: props =>
            `Path \`${props.path}\` must be an integer between ${min} and ${max}.`
        }
      },
      comments: String
    },
    {
      _id: false,
      timestamps: false
    }
  );
}

export default createScorecardEntrySchema;
