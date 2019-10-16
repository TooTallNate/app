import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import createServer from "../server";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import nav from "../nav";

dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });

jest.setTimeout(10000);
jest.mock("../nav");

const navMock = nav as jest.Mocked<typeof nav>;

process.env.MONGO_URI = `${global.__MONGO_URI__}${process.env.JEST_WORKER_ID}`;

process.env.PORT = (
  parseInt(process.env.PORT || "7000") +
  (parseInt(process.env.JEST_WORKER_ID) % 1000)
).toString();

let server: HttpServer | HttpsServer;

// Connect to mongo and start the server
// before any tests run.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  });
  server = await createServer();
});

// Reset the mongo database before each test.
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
  navMock.getJobs.mockClear();
  navMock.getUser.mockClear();
});

// Disconnect from mongo and stop the server
//  after all tests run.
afterAll(async () => {
  await mongoose.disconnect();
  if (server) {
    server.close();
  }
});
