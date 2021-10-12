import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { LoggerService } from '@kova/core'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  @Inject(LoggerService) logger: LoggerService

  use(req: Request, res: Response, next: NextFunction): any {
    next()
  }
}
