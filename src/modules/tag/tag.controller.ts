import { SsrRender } from '@/core/render'
import { Controller, Get, Param } from '@nestjs/common'
import { TagApiService } from './api.service'

@Controller()
export class TagController {
  constructor(readonly apiService: TagApiService) {}

  @Get('/tag/:slug')
  @SsrRender()
  async getTag(@Param('slug') slug: string) {
    const pageProps = await this.apiService.getTagBySlug(slug)
    return {
      pageProps,
    }
  }
}
