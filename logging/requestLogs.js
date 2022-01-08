const winston        = require('winston');
const expressWinston = require('express-winston');


// Create a Winston logger with a file transport
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename:  config.get('logFiles.requestLogspath') })
  ]
});

// Create an Express middleware for logging requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: config.get('logFiles.requestLogspath') })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta          : true,
  msg           : 'HTTP {{req.method}} {{req.url}} FROM {{req.ip}}',
  expressFormat : true,
  colorize      : false,
  ignoreRoute   : function (req, res) { return false; }
});

module.exports = requestLogger;