import { Injectable } from '@nestjs/common'
import { Article } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { ArticleModel } from '@/models/article'
import { UserModel } from '@/models/user'
import { PrismaService } from '@/prisma'

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async articles(
    userId: number,
    options: {
      limit?: number
    } = {},
  ): Promise<Article[]> {
    const data = await this.prisma.article.findMany({
      ...this.articleConditions(userId),
    })
    return plainToClass(ArticleModel, data)
  }

  async users(articleId: number): Promise<UserModel[]> {
    const users = await this.prisma.user.findMany({
      ...this.userConditions(articleId),
    })
    return users
  }

  async findUsersAndCount(articleId: number) {
    const [users, count] = await Promise.all([this.users(articleId), this.usersCount(articleId)])
    return [users, count]
  }

  articleConditions(userId: number) {
    return {
      where: { likes: { some: { userId } } },
    }
  }

  userConditions(articleId: number) {
    return {
      where: { likes: { some: { articleId } } },
    }
  }

  async hasLike(conditions: { userId: number; articleId: number }): Promise<boolean> {
    const like = await this.prisma.like.findFirst({
      where: { ...conditions },
    })
    return !!like
  }

  async usersCount(articleId: number): Promise<number> {
    const count = await this.prisma.user.count({
      ...this.userConditions(articleId),
    })
    return count
  }

  async articlesCount(userId: number): Promise<number> {
    const count = await this.prisma.article.count({
      ...this.articleConditions(userId),
    })
    return count
  }
}
