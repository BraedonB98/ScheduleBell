const { createLogger, format, transports, config } = require("winston");

const httpErrorLog = createLogger({
  levels: config.syslog.levels,
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./shared/Logs/httpError.log" }),
  ],
});

const organizationTransactionLog = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "./shared/Logs/organizationTransaction.log",
    }),
  ],
});

module.exports = {
  httpErrorLog: httpErrorLog,
  organizationTransactionLog: organizationTransactionLog,
};
