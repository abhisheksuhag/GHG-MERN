// SERVER/config/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

// Define the custom format for logging
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    // Log to a file with daily rotation behavior
    new transports.File({
      filename: path.join(__dirname, '../logs/app.log'),
      level: 'info', // Only log 'info' level and above to the file
      maxsize: 5242880, // 5MB max file size
      maxFiles: 5, // Keep the last 5 log files
    }),
    // Also log to the console
    new transports.Console({
      level: 'debug', // Log everything to the console (including debug messages)
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

module.exports = logger;
