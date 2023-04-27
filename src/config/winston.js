import { createLogger, transports } from "winston";

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
    }),
    new transports.Console({
      level: "warn",
    }),
    new transports.Console({
      level: "error",
    }),
    new transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

export default logger;
