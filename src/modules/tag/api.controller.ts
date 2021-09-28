import { Controller, Get, Param } from '@nestjs/common'
import _ from 'lodash-es'
import { Tag } from '@prisma/client'
import { TagApiService } from './api.service'
import { ContentApiPrefix } from '@/constants/constants'

@Controller(ContentApiPrefix)
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

  @Get('/tags/:slug/posts')
  async getPostByTagSlug(@Param('slug') slug: string) {
    const posts = await this.apiService.getPostByTagSlug(slug)
    return posts
  }
}
