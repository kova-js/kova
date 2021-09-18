import { Controller, Get, Param } from '@nestjs/common'
import { CategoryApiService } from './api.service'

@Controller('/api')
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
}
