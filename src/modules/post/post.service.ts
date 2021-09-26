import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { PostModel } from '@/models/post'
import { PrismaService } from '@/prisma'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(PostWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    const data = await this.prisma.post.findUnique({
      where: PostWhereUniqueInput,
      include: {
        user: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
        category: true,
        tags: true,
        _count: {
          select: {
            tags: true,
          },
        },
      },
    })
    return plainToClass(PostModel, data)
  }

  async posts(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.PostWhereUniqueInput
      where?: Prisma.PostWhereInput
      orderBy?: Prisma.PostOrderByWithAggregationInput
    } = {},
  ): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params
    const data = await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: {
          select: {
            slug: true,
            name: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    })
    return plainToClass(PostModel, data)
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    })
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput
    data: Prisma.PostUpdateInput
  }): Promise<Post> {
    const { where, data } = params
    return this.prisma.post.update({
      data,
      where,
    })
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
      include: {
        tags: true,
        favoritings: true,
        content: true,
      },
    })
  }

  async getPostIdBySlug(slug: string): Promise<number | null> {
    const post = await this.prisma.post.findFirst({ where: { slug: slug }, select: { id: true } })
    return post ? post.id : null
  }

  async getFavoritesByPost(slug: string): Promise<any[]> {
    const postId = await this.getPostIdBySlug(slug)

    if (!postId) return []

    return this.prisma.user.findMany({
      where: {
        favorites: {
          some: {
            postId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        slug: true,
      },
    })
  }

  async getTagsByPost(slug: string): Promise<any[]> {
    const postId = await this.getPostIdBySlug(slug)

    if (!postId) return []

    return this.prisma.tag.findMany({
      where: {
        posts: {
          some: {
            postId,
          },
        },
      },
      select: {
        id: true,
        slug: true,
      },
    })
  }
}
