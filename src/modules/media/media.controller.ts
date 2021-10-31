import { render } from '@aora/cli/lib/core-vue3'
import { Controller, Get, Param, Req, Res } from '@nestjs/common'
import { Readable } from 'stream'
import { MediaApiService } from './api.service'

@Controller()
export class MediaController {
  constructor(private readonly apiService: MediaApiService) {}

  @Get('/media/:slug')
  async getMediaBySlug(@Param('slug') slug: string, @Req() req, @Res() res) {
    try {
      const ctx = {
        request: req,
        response: res,
        apiService: this.apiService,
      }
      const stream = await render<Readable>(ctx, {
        stream: true,
      })
      stream.pipe(res, { end: false })
      stream.on('end', () => {
        res.end()
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
