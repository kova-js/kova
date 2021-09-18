import { SsrRender } from '@/core/render'
import { Controller, Get, Param } from '@nestjs/common'
import { CategoryApiService } from './api.service'

@Controller()
export class CategoryController {
  constructor(private readonly apiService: CategoryApiService) {}

  @Get('/category')
  @SsrRender()
  async categories() {
    const pageProps = await this.apiService.categories()
    return {
      pageProps,
    }
  }

  @Get('/category/:slug')
  @SsrRender({ cache: true })
  async getCategoryBySlug(@Param('slug') slug: string) {
    const pageProps = await this.apiService.getCategoryBySlug(slug)
    return {
      pageProps,
    }
  }
}
