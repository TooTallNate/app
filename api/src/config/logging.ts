import winston from "winston";
import { Syslog } from "winston-syslog";
import { hostname } from "os";
import * as Transport from "winston-transport";

const { combine, timestamp, printf } = winston.format;

const PAPERTRAIL_URL = process.env.PAPERTRAIL_URL;
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const NODE_ENV = process.env.NODE_ENV || "production";
const BRANCH = process.env.VERCEL_GITHUB_COMMIT_REF || "unknown";

const transports: Transport[] = [new winston.transports.Console()];
const exceptionHandlers: Transport[] = [new winston.transports.Console()];

if (NODE_ENV === "production") {
  if (PAPERTRAIL_URL) {
    const [host, port] = PAPERTRAIL_URL.split(":");
    const app_name = BRANCH === "master" ? "api" : `api-${BRANCH}`;
    transports.push(
      new Syslog({
        host,
        port: Number(port),
        app_name,
        localhost: hostname()
      })
    );
    exceptionHandlers.push(
      new Syslog({
        host,
        port: Number(port),
        app_name,
        localhost: hostname()
      })
    );
  }
} else {
  transports.push(
    new winston.transports.File({
      filename: "logs/api.log"
    })
  );
  exceptionHandlers.push(
    new winston.transports.File({
      filename: "logs/api.log"
    })
  );
}

const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports,
  exceptionHandlers,
  format: combine(
    timestamp(),
    printf(
      ({ level, message, timestamp }) =>
        `${timestamp} ${level.toUpperCase()}: ${message}`
    )
  ),
  exitOnError: false
});

export default logger;
