import { SsrRender } from '@/core/render'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { PostApiService } from './api.service'

@Controller()
export class PostController {
  constructor(private readonly apiService: PostApiService) {}

  @Get('/')
  @SsrRender({ cache: true })
  async handlerIndex(@Query('q') q: string) {
    const pageProps = await this.apiService.posts(q)
    return {
      pageProps,
    }
  }

  @Get('/post/:slug')
  @SsrRender()
  async getPostBySlug(@Param('slug') slug: string) {
    const pageProps = await this.apiService.getPostBySlug(slug)
    return {
      pageProps,
    }
  }


  @Get('/write')
  @SsrRender()
  async write() {
    return {
      // pageProps,
    }
  }
}
