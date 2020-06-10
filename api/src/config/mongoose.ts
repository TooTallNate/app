import mongoose from "mongoose";
import logger from "./logging";

export function initMongoose() {
  mongoose.connect(process.env.MONGO_URL || "", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on("connected", () => {
    logger.info("Mongoose connected");
  });
}
