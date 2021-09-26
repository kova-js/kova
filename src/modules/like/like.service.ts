import { Injectable } from '@nestjs/common'
import { Post } from '~/prisma/client'
import { plainToClass } from 'class-transformer'
import { PostModel } from '@/models/post'
import { UserModel } from '@/models/user'
import { PrismaService } from '@/prisma'

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async posts(
    userId: number,
    options: {
      limit?: number
    } = {},
  ): Promise<Post[]> {
    const data = await this.prisma.post.findMany({
      ...this.postConditions(userId),
      take: options.limit || 12,
    })
    return plainToClass(PostModel, data)
  }

  async users(postId: number): Promise<UserModel[]> {
    const users = await this.prisma.user.findMany({
      ...this.userConditions(postId),
    })
    return users
  }

  async findUsersAndCount(postId: number) {
    const [users, count] = await Promise.all([this.users(postId), this.usersCount(postId)])
    return [users, count]
  }

  postConditions(userId: number) {
    return {
      where: { likes: { some: { userId } } },
    }
  }

  userConditions(postId: number) {
    return {
      where: { likes: { some: { postId } } },
    }
  }

  async hasLike(conditions: { userId: number; postId: number }): Promise<boolean> {
    const like = await this.prisma.like.findFirst({
      where: { ...conditions },
    })
    return !!like
  }

  async usersCount(postId: number): Promise<number> {
    const count = await this.prisma.user.count({
      ...this.userConditions(postId),
    })
    return count
  }

  async postsCount(userId: number): Promise<number> {
    const count = await this.prisma.post.count({
      ...this.postConditions(userId),
    })
    return count
  }
}
