import winston from "winston";
import { Syslog } from "winston-syslog";
import { hostname } from "os";

const { combine, timestamp, printf } = winston.format;

const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const NODE_ENV = process.env.NODE_ENV || "production";

const transports = [];
const exceptionHandlers = [];

if (NODE_ENV === "production") {
  transports.push(
    new Syslog({
      host: "logs2.papertrailapp.com",
      port: 43899,
      app_name: "api",
      localhost: hostname()
    })
  );
} else {
  transports.push(
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/api.log"
    })
  );
  exceptionHandlers.push(
    new winston.transports.Console(),
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
