import { AdminApiPrefix } from '@/constants/constants'
import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { Tag } from '@prisma/client'
import _ from 'lodash'
import { TagApiService } from './api.service'

@Controller(AdminApiPrefix)
export class TagAdminApiController {
  constructor(private readonly apiService: TagApiService) {}

  @Get('/tags')
  async getTag() {
    const tags = await this.apiService.getTags()
    return tags
  }

  @Get('/tags/:id')
  async getTagBySlug(@Param('slug', ParseIntPipe) id: number) {
    const tag = await this.apiService.getTag(id)
    return _.omit<Tag>(tag)
  }

  @Get('/tags/:slug/posts')
  async getPostByTagSlug(@Param('slug') slug: string) {
    const posts = await this.apiService.getPostByTagSlug(slug)
    return posts
  }

  @Post('/tags')
  async create() {}
}
