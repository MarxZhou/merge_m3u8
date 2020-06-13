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
  level: 'silly',
});

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json()
  ),
  defaultMeta: { label: 'log' },
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

export interface LoggerToolLevels {
  error(message: string, meta: object): void;

  warn(message: string, meta: object): void;

  info(message: string, meta: object): void;

  http(message: string, meta: object): void;

  verbose(message: string, meta: object): void;

  debug(message: string, meta: object): void;

  silly(message: string, meta: object): void;
}

export interface LoggerToolType extends LoggerToolLevels {
  label: string;

  setLabel(label: string): void;
}

class LoggerTool implements LoggerToolType {
  label: string;

  constructor() {
    this.label = 'log';
  }

  setLabel(label: string): void {
    this.label = label;
  }

  error(message: string, meta: object): void {
    logger.error(message, {
      label: this.label,
      ...meta,
    });
  }

  warn(message: string, meta: object): void {
    logger.warn(message, {
      label: this.label,
      ...meta,
    });
  }

  info(message: string, meta: object): void {
    logger.info(message, {
      label: this.label,
      ...meta,
    });
  }

  http(message: string, meta: object): void {
    logger.http(message, {
      label: this.label,
      ...meta,
    });
  }

  verbose(message: string, meta: object): void {
    logger.verbose(message, {
      label: this.label,
      ...meta,
    });
  }

  debug(message: string, meta: object): void {
    logger.debug(message, {
      label: this.label,
      ...meta,
    });
  }

  silly(message: string, meta: object): void {
    logger.silly(message, {
      label: this.label,
      ...meta,
    });
  }
}

export default LoggerTool;
