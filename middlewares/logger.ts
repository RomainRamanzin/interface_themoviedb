import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "combined.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(format.timestamp(), format.simple()),
  }));
}

export { logger };
