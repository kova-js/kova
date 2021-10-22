import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { LoggerService } from '@kova/core'

@Injectable()
export class IpMiddleware implements NestMiddleware {
  @Inject(LoggerService) logger: LoggerService
  private readonly whiteList = [
    '127.0.0.1',
    'localhost',
    'aiecho.cn',
    'k.loyep.com',
    'dev.aiecho.cn',
  ]

  use(req: Request, res: Response, next: NextFunction): void  {
    if (this.whiteList.includes(req.hostname)) {
      next()
    } else {
      res.status(500).send()
    }
  }
}
