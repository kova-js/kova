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

  @Get('/search')
  @SsrRender({ cache: true })
  async handlerSearch(@Query('q') q: string) {
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

  @Get('/rss')
  async rss() {
    return `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
      <title>菜鸟教程首页</title>
      <link>https://fishbone.live/</link>
      <description>Fishbone 的技术博客</description>
      <item>
        <title>基于Egg.js的博客增加RSS功能</title>
        <link>https://fishbone.live/article/9</link>
        <description>什么是 RSS ?</description>
      </item>
      <item>
        <title>博客增加评论功能</title>
        <link>https://fishbone.live/article/10</link>
        <description>如何基于React，NodeJs，MySQL，开发一个类似于掘金的评论模块</description>
      </item>
    </channel>
  </rss>`
  }
}
