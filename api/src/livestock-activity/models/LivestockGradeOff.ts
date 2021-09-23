import LivestockActivityModel, {
  LivestockActivityDocument
} from "./LivestockActivity";
import { Schema } from "mongoose";

export interface LivestockGradeOffDocument extends LivestockActivityDocument {
  job: string;
  event: string;
  postingDate: String;
  quantities: {
    code: string;
    quantity: number;
  }[];
  livestockWeight: number;
  comments: string;
}

const LivestockGradeOffSchema = new Schema({
  job: {
    type: String,
    required: true,
    unique: true
  },
  postingDate: String,
  event: String,
  quantities: [
    {
      _id: false,
      code: String,
      quantity: Number
    }
  ],
  livestockWeight: Number,
  comments: String
});

const LivestockGradeOffModel = LivestockActivityModel.discriminator<
  LivestockGradeOffDocument
>("LivestockGradeOff", LivestockGradeOffSchema, "gradeoff");
export default LivestockGradeOffModel;
