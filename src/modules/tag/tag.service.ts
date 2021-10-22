import { Injectable } from '@nestjs/common'
import { Tag, Post, Prisma } from '@prisma/client'
import { TagModel } from '@/models/tag'
import { PostModel } from '@/models/post'
import { plainToClass } from 'class-transformer'
import { BaseService } from '@/prisma/base.service'

@Injectable()
export class TagService extends BaseService {
  async getTag(TagWhereUniqueInput: Prisma.TagWhereUniqueInput): Promise<Tag | null> {
    const data = await this.prisma.tag.findUnique({
      where: TagWhereUniqueInput,
    })
    return plainToClass(TagModel, data)
  }

  async getPostIdBySlug(slug: string): Promise<number | null> {
    const post = await this.prisma.post.findFirst({ where: { slug: slug }, select: { id: true } })
    return post ? post.id : null
  }

  async getPostsByTag(slug: string): Promise<Post[]> {
    const tagId = await this.getPostIdBySlug(slug)
    if (!tagId) return []
    const data = await this.prisma.post.findMany({
      where: {
        tags: {
          some: {
            tagId,
          },
        },
      },
    })
    return plainToClass(PostModel, data)
  }

  async tags(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.TagWhereUniqueInput
      where?: Prisma.TagWhereInput
      orderBy?: Prisma.TagOrderByWithAggregationInput
    } = {},
  ): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params
    const data = await this.prisma.tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
    return plainToClass(TagModel, data)
  }

  async createTag(data: Prisma.TagCreateInput): Promise<Tag> {
    return this.prisma.tag.create({
      data,
    })
  }

  async updateTag(params: {
    where: Prisma.TagWhereUniqueInput
    data: Prisma.TagUpdateInput
  }): Promise<Tag> {
    const { where, data } = params
    return this.prisma.tag.update({
      data,
      where,
    })
  }

  async deleteTag(where: Prisma.TagWhereUniqueInput): Promise<Tag> {
    return this.prisma.tag.delete({
      where,
    })
  }
}
