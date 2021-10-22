import { Injectable } from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { BaseService } from '@/prisma/base.service'

@Injectable()
export class UserService extends BaseService {
  async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async getLikesByUser(slug: string): Promise<any[]> {
    const userId = await this.getUserIdBySlug(slug)
    if (!userId) return []
    return await this.prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
    })
  }

  async getUserIdBySlug(slug: string): Promise<number | null> {
    const user = await this.prisma.user.findFirst({ where: { slug: slug }, select: { id: true } })
    return user ? user.id : null
  }

  async getFavoritesByUser(slug: string): Promise<any[]> {
    const userId = await this.getUserIdBySlug(slug)
    if (!userId) return []
    return this.prisma.post.findMany({
      where: {
        favoritings: {
          some: {
            userId,
          },
        },
        status: 'PUBLISHED',
        public: true,
      },
    })
  }

  async users(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.UserWhereUniqueInput
      where?: Prisma.UserWhereInput
      orderBy?: Prisma.UserOrderByWithAggregationInput
    } = {},
  ): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    })
  }
}
