import { SsrRender } from '@/core/render'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { ArticleApiService } from './api.service'

@Controller()
export class ArticleController {
  constructor(private readonly apiService: ArticleApiService) {}

  @Get('/')
  @SsrRender({ cache: true })
  async handlerIndex(@Query('q') q: string) {
    const pageProps = await this.apiService.articles(q)
    return {
      pageProps,
    }
  }

  @Get('/article/:slug')
  @SsrRender()
  async getArticleBySlug(@Param('slug') slug: string) {
    const pageProps = await this.apiService.getArticleBySlug(slug)
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
