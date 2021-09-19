import { Inject, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { isEmpty } from 'lodash'
import { PostService } from './post.service'

@Injectable()
export class PostApiService {
  @Inject(PostService) private readonly service: PostService

  async posts(q: string) {
    const filter: Prisma.PostWhereInput = {}
    if (!isEmpty(q)) {
      filter.title = { contains: q }
    }
    const posts = await this.service.posts({
      where: filter,
      take: 20,
    })
    return posts
  }

  async getPostBySlug(slug: string) {
    const post = await this.service.getPost({
      slug,
    })
    return post
  }

  async getPostById(id: number) {
    const post = await this.service.getPost({
      id,
    })
    return post
  }

  async getFavoritesBySlug(slug: string) {
    return await this.service.getFavoritesByPost(slug)
  }

  async getTagsBySlug(slug: string) {
    return await this.service.getTagsByPost(slug)
  }
}
