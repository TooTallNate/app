import mongoose from "mongoose";
import logger from "./logging";

export function initMongoose() {
  mongoose.connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: process.env.NODE_ENV !== "production"
  });
  mongoose.connection.on("connected", () => {
    logger.info("Mongoose connected");
  });
}
