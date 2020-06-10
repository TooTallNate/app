// Do this first to load the test envrionment.
import "./env";

import mongoose from "mongoose";
import createServer from "../src/server";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
    }
  }
}

process.env.MONGO_URL = `${global.__MONGO_URI__}${process.env.JEST_WORKER_ID}`;

process.env.PORT = (
  parseInt(process.env.PORT || "7000") +
  (parseInt(process.env.JEST_WORKER_ID) % 1000)
).toString();

let server: HttpServer | HttpsServer;

// Connect to mongo and start the server
// before any tests run.
beforeAll(async () => {
  server = await createServer();
});

// Reset the mongo database before each test.
beforeEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

// Disconnect from mongo and stop the server
//  after all tests run.
afterAll(async () => {
  if (server) {
    server.close();
  }
});
