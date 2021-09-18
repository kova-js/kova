import { Req } from '@nestjs/common'
import { Controller, Post } from '@nestjs/common'
import { Request, Response } from 'express'
import { LoggerApiService } from './api.service'
import { Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

const logBidCookieName = 'bid'

@Controller('/api')
export class LoggerApiController {
  constructor(private readonly service: LoggerApiService) {}

  @Post('/log')
  async logging(@Req() req: Request, @Res() res: Response) {
    const url = req.headers.referer || ''
    if (!url) {
      return res.send('')
    }
    const cookieBid = req.cookies[logBidCookieName]
    const bid = cookieBid || uuidv4()
    const ua = req.headers['user-agent'] || ''
    const data = { ip: '127.0.0.1', bid, url, ua }
    this.service.log(data)
    if (cookieBid) {
      return res.send('')
    }
    return res.cookie(logBidCookieName, bid, { maxAge: 31536000, httpOnly: true }).send('')
  }
}
