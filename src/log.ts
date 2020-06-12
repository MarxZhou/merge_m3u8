import { format, transports, createLogger } from 'winston';
import 'winston-daily-rotate-file';
import AppRoot from 'app-root-path';

const combineTransport = new transports.DailyRotateFile({
  filename: 'combine-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: `${AppRoot}/logs`,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'silly',
});

const errorTransport = new transports.DailyRotateFile({
  filename: `error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: `${AppRoot}/logs`,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
});

const exceptionTransport = new transports.DailyRotateFile({
  filename: `exception-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: `${AppRoot}/logs`,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
});

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json()
  ),
  defaultMeta: { service: 'client' },
  transports: [combineTransport, errorTransport],
  exceptionHandlers: [exceptionTransport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.align(),
        format.splat(),
        format.printf(info => {
          return `${info.timestamp} ${info.level}: [${info.label}] ${info.message}`;
        })
      ),
      level: 'silly',
    })
  );
}

/*
 * 下面的代码为测试代码
 * */
/*
let i = 0;

const logActions = (): void => {
  logger.error(`This is an error log item ${i}`, {
    service: 'test-error',
    label: 'error-label',
  });

  logger.warn(`This is an warn log item ${i}`, {
    service: 'test-warn',
    label: 'warn-label',
  });

  logger.info(`This is an info log item ${i}`, {
    service: 'test-info',
    label: 'info-label',
  });

  logger.http(`This is an http log item ${i}`, {
    service: 'test-http',
    label: 'http-label',
  });

  logger.verbose(`This is an verbose log item ${i}`, {
    service: 'test-verbose',
    label: 'verbose-label',
  });

  logger.debug(`This is an debug log item ${i}`, {
    service: 'test-debug',
    label: 'debug-label',
  });

  logger.silly(`This is an silly log item ${i}`, {
    service: 'test-silly',
    label: 'silly-label',
  });
};

setInterval((): void => {
  i += 1;
  logActions();
}, 1000);
*/

export default logger;
