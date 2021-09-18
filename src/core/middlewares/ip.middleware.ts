import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { LoggerService } from '../logger'

@Injectable()
export class IpMiddleware implements NestMiddleware {
  @Inject(LoggerService) logger: LoggerService
  private readonly whiteList = ['127.0.0.1', 'localhost', 'aiecho.cn', 'k.loyep.com', 'dev.aiecho.cn']

  use(req: Request, res: Response, next: NextFunction) {
    if (this.whiteList.includes(req.hostname)) {
      next()
    } else {
      res.status(500).send()
    }
  }
}
