const { createLogger, format, transports, config } = require("winston");

const httpErrorLog = createLogger({
  levels: config.syslog.levels,
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./shared/log/log-files/httpError.log" }),
  ],
});

const organizationTransactionLog = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "./shared/log/log-files/organizationTransaction.log",
    }),
  ],
});

module.exports = {
  httpErrorLog: httpErrorLog,
  organizationTransactionLog: organizationTransactionLog,
};
