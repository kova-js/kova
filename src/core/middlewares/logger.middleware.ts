import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { LoggerService } from '../logger'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  @Inject(LoggerService) logger: LoggerService

  use(req: Request, res: Response, next: NextFunction): any {
    next()
  }
}
