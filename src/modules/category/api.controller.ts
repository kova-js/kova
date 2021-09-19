import { ContentApiPrefix } from '@/constants/constants'
import { Controller, Get, Param } from '@nestjs/common'
import { CategoryApiService } from './api.service'

@Controller(ContentApiPrefix)
export class CategoryApiController {
  constructor(private readonly service: CategoryApiService) {}

  @Get('/categories')
  async getCategory() {
    const categories = await this.service.categories()
    return categories
  }

  @Get('/categories/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return await this.service.getCategoryBySlug(slug)
  }

  @Get('/categories/:slug/posts')
  async getPostByCategorySlug(@Param('slug') slug: string) {
    return await this.service.getCategoryBySlug(slug)
  }
}
