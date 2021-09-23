import { Body, Req } from '@nestjs/common'
import { Controller, Post } from '@nestjs/common'
import { Request, Response } from 'express'
import { LoggerApiService } from './api.service'
import { Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { HttpService } from '@nestjs/axios'
import { LoggerService } from './logger.service'
import { firstValueFrom } from 'rxjs'

const logBidCookieName = 'bid'

@Controller('/api')
export class LoggerApiController {
  constructor(private readonly service: LoggerApiService, private readonly http: HttpService, private readonly logger: LoggerService) {}

  @Post('/log')
  async logging(@Req() req: Request, @Res() res: Response, @Body() data: any) {
    const url = req.headers.referer || ''
    if (!url) {
      return res.send('')
    }
    const cookieBid = req.cookies[logBidCookieName]
    const bid = cookieBid || data.uid
    const ua = req.headers['user-agent'] || ''
    const fpdata = await firstValueFrom(this.http.get(`https://api.fpjs.io/visitors/${bid}`, { params: {
      token: 'lzH4Eg3cztRbVDcNnGbU',
      limit: 1
    }}))
    console.log('fpdata', fpdata)
    const logData = { ip: '127.0.0.1', bid, url, ua }
    this.service.log(logData)
    if (cookieBid) {
      return res.send('')
    }
    return res.cookie(logBidCookieName, bid, { maxAge: 31536000, httpOnly: true }).send('')
  }
}
