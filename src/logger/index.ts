import { format, transports, createLogger } from 'winston';
import 'winston-daily-rotate-file';
import AppRoot from 'app-root-path';
import path from 'path';

const combineTransport = new transports.DailyRotateFile({
  filename: 'combine-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: path.join(AppRoot.path, 'logs'),
  maxSize: '20m',
  maxFiles: '14d',
  level: 'silly',
});

const errorTransport = new transports.DailyRotateFile({
  filename: `error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: path.join(AppRoot.path, 'logs'),
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
});

const exceptionTransport = new transports.DailyRotateFile({
  filename: `exception-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: path.join(AppRoot.path, 'logs'),
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

export interface Meta {
  filename?: string;
  error?: any;
  backupPath?: string;
  inputPath?: string;
  script?: string;
}

export interface LoggerToolLevels {
  error(message: string, meta?: Meta): void;

  warn(message: string, meta?: Meta): void;

  info(message: string, meta?: Meta): void;

  http(message: string, meta?: Meta): void;

  verbose(message: string, meta?: Meta): void;

  debug(message: string, meta?: Meta): void;

  silly(message: string, meta?: Meta): void;
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

  error(message: string, meta: Meta = {}): void {
    logger.error(message, {
      label: this.label,
      ...meta,
    });
  }

  warn(message: string, meta: Meta = {}): void {
    logger.warn(message, {
      label: this.label,
      ...meta,
    });
  }

  info(message: string, meta: Meta = {}): void {
    logger.info(message, {
      label: this.label,
      ...meta,
    });
  }

  http(message: string, meta: Meta = {}): void {
    logger.http(message, {
      label: this.label,
      ...meta,
    });
  }

  verbose(message: string, meta: Meta = {}): void {
    logger.verbose(message, {
      label: this.label,
      ...meta,
    });
  }

  debug(message: string, meta: Meta = {}): void {
    logger.debug(message, {
      label: this.label,
      ...meta,
    });
  }

  silly(message: string, meta: Meta = {}): void {
    logger.silly(message, {
      label: this.label,
      ...meta,
    });
  }
}

export default LoggerTool;
