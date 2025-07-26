import pino from "pino";

export const logger = pino({
  // allow emoji in logs
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
      messageFormat: "{msg}",
    },
  },
});