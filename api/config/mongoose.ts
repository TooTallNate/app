import mongoose from "mongoose";

export function initMongoose() {
  mongoose.connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: process.env.NODE_ENV !== "production"
  });
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
  });
}
