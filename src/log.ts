import { format, transports, createLogger } from 'winston';
import AppRoot from 'app-root-path';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const combineTransport = new transports.File({
  filename: `combine.log`,
  // filename: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}.info.log`,
  dirname: `${AppRoot}/logs`,
  maxsize: 5 * 1024 * 1024,
  maxFiles: 2,
  level: 'silly',
});

const errorTransport = new transports.File({
  filename: `error.log`,
  // filename: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}.error.log`,
  dirname: `${AppRoot}/logs`,
  maxsize: 5 * 1024 * 1024,
  maxFiles: 2,
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

for (let i = 0; i < 1; i += 1) {
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
}

export default logger;
