import { Injectable } from '@nestjs/common'
import { Article, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { ArticleModel } from '@/models/article'
import { PrismaService } from '@/prisma'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getArticle(ArticleWhereUniqueInput: Prisma.ArticleWhereUniqueInput): Promise<Article | null> {
    const data = await this.prisma.article.findUnique({
      where: ArticleWhereUniqueInput,
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
          }
        }
      },
    })
    return plainToClass(ArticleModel, data)
  }

  async articles(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.ArticleWhereUniqueInput
      where?: Prisma.ArticleWhereInput
      orderBy?: Prisma.ArticleOrderByInput
    } = {},
  ): Promise<Article[]> {
    const { skip, take, cursor, where, orderBy } = params
    const data = await this.prisma.article.findMany({
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
    return plainToClass(ArticleModel, data)
  }

  async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({
      data,
    })
  }

  async updateArticle(params: {
    where: Prisma.ArticleWhereUniqueInput
    data: Prisma.ArticleUpdateInput
  }): Promise<Article> {
    const { where, data } = params
    return this.prisma.article.update({
      data,
      where,
    })
  }

  async deleteArticle(where: Prisma.ArticleWhereUniqueInput): Promise<Article> {
    return this.prisma.article.delete({
      where,
      include: {
        tags: true,
        favoritings: true,
        content: true,
      },
    })
  }

  async getArticleIdBySlug(slug: string): Promise<number | null> {
    const article = await this.prisma.article.findFirst({ where: { slug: slug }, select: { id: true } })
    return article ? article.id : null
  }

  async getFavoritesByArticle(slug: string): Promise<any[]> {
    const articleId = await this.getArticleIdBySlug(slug)

    if (!articleId) return []

    return this.prisma.user.findMany({
      where: {
        favorites: {
          some: {
            articleId,
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

  async getTagsByArticle(slug: string): Promise<any[]> {
    const articleId = await this.getArticleIdBySlug(slug)

    if (!articleId) return []

    return this.prisma.tag.findMany({
      where: {
        articles: {
          some: {
            articleId,
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
