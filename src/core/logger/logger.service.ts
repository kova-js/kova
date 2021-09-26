import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common'
import path from 'path'
import { Logger, format, createLogger, transports } from 'winston'
import 'winston-daily-rotate-file'

const LOG_DIR_PATH = path.resolve(process.cwd(), './storage/logs')

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.colorize({ all: true }),
        format.json(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => {
          const durationMs = info.durationMs ? ` (${info.durationMs} ms)` : ''
          const errorStack = info.stack ? `\n${info.stack}` : ''
          return `[${info.level}] ${info.timestamp}:${durationMs} ${info.message} ${errorStack}`
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: `${LOG_DIR_PATH}/%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          auditFile: `${LOG_DIR_PATH}/audit.json`,
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    })
  }

  log(message: string, context?: string) {
    this.logger.log('info', message, context)
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, trace, context)
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context)
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context)
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, context)
  }
}
