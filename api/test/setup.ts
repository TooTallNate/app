// Do this first to load the test envrionment.
import "./env";

import mongoose from "mongoose";
import { initMongoose } from "../src/config/mongoose";
import { getUser } from "./utils";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
    }
  }
}

process.env.MONGO_URL = `${global.__MONGO_URI__}${process.env.JEST_WORKER_ID}`;

beforeAll(() => {
  initMongoose();
});

// Reset the mongo database before each test.
beforeEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  getUser.mockReset();
});

afterAll(async () => {
  await mongoose.disconnect();
});
