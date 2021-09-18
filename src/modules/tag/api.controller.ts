import { Controller, Get, Param } from '@nestjs/common'
import _ from 'lodash'
import { Tag } from '@prisma/client'
import { TagApiService } from './api.service'
// import { hashSync } from 'bcrypt'

@Controller('/api')
export class TagApiController {
  constructor(private readonly apiService: TagApiService) {}

  @Get('/tags')
  async getTag() {
    const tags = await this.apiService.getTag()
    return tags
  }

  @Get('/tags/:slug')
  async getTagBySlug(@Param('slug') slug: string) {
    const tag = await this.apiService.getTagBySlug(slug)
    return _.omit<Tag>(tag)
  }

  @Get('/tags/:slug/articles')
  async getArticleByTagSlug(@Param('slug') slug: string) {
    const articles = await this.apiService.getArticleByTagSlug(slug)
    return articles
  }
}
