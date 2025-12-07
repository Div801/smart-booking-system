const timestamp = () => `[${new Date().toISOString()}]`;

const logger = (level, ...args) => {
  const tag = timestamp();
  switch (level) {
    case "warn":
      return console.warn(tag, ...args);
    case "error":
      return console.error(tag, ...args);
    default:
      return console.log(tag, ...args);
  }
};

logger.log = (...args) => logger("log", ...args);
logger.warn = (...args) => logger("warn", ...args);
logger.error = (...args) => logger("error", ...args);

export default logger;
