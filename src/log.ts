import winston from 'winston';
import 'winston-daily-rotate-file';

const infoTransport = new winston.transports.DailyRotateFile({
  filename: 'application-info-%DATE%.log',
  frequency: '10s',
  dirname: '../logs',
  datePattern: 'YYYY-MM-DD HH:MM:ss',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: 6,
  level: 'info',
});

infoTransport.on('rotate', (oldFilename: string, newFilename: string) => {
  // do something fun
  logger.info('create new info log file', { level: `info`, oldFilename, newFilename });
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: 'application-error-%DATE%.log',
  frequency: '10s',
  dirname: '../logs',
  datePattern: 'YYYY-MM-DD HH:MM:ss',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: 6,
  level: 'error',
});

errorTransport.on('rotate', (oldFilename: string, newFilename: string) => {
  // do something fun
  logger.info('create new error log file', { level: `error`, oldFilename, newFilename });
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'client' },
  transports: [
    // - Write all logs with level `info` and below to `application-info-%DATE%.log`
    infoTransport,

    // - Write all logs with level `error` and below to `application-error-%DATE%.log`
    errorTransport,
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    })
  );
}

let i = 0;
console.log(`i:`, i);

setInterval((): void => {
  i += 1;
  console.log(`i:`, i);

  logger.info(`This is an info log item ${i}`, {
    service: 'test',
  });

  logger.error(`This is an error log item ${i}`, {
    service: 'test',
  });
}, 1000);

export default logger;
