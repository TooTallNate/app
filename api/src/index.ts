import path from "path";
import dotenv from "dotenv";
import createServer from "./server";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default createServer();
