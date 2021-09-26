import { Inject, Injectable } from '@nestjs/common'
import { CategoryService } from './category.service'

@Injectable()
export class CategoryApiService {
  @Inject(CategoryService) private readonly service: CategoryService

  async categories() {
    return this.service.categories()
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.service.getCategory({
      slug,
    })
    console.log(category)
    return category
  }
}
