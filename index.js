const zod = require("zod");
const pino = require("pino");
const logger = pino({
  level: process.env.LOGGER_LEVEL || "info",
  base: undefined,
  timestamp: false,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  }
});
logger.info(`debug level is ${logger.level}`)
function handler(event) {
  const CalcSechema = zod.object({
    op1: zod.number(),
    op2: zod.number(),
    operation: zod.string(),
  });
  logger.debug(`recieved data are ${event.body}` )
  try {
   CalcSechema.parse(JSON.parse(event.body));
   logger.debug('after JSON parsing: valid data')
    return response(200, event.body);
  } catch (error) {
    logger.error(`validation error: ${error.message}`)
    return response(400, error.message);
  }
}

function response(code, body) {
  return {
    statusCode: code,
    body: body,
  };
}
module.exports = {
  handler,
};
