import { Inject, Injectable } from '@nestjs/common'
import { TagService } from './tag.service'

@Injectable()
export class TagApiService {
  @Inject(TagService) private readonly service: TagService

  async getTag() {
    const tags = await this.service.tags()
    return tags
  }

  async getTagBySlug(slug: string) {
    const tag = await this.service.getTag({ slug })
    return tag
  }

  async getPostByTagSlug(slug: string) {
    const posts = await this.service.getPostsByTag(slug)
    return posts
  }
}
