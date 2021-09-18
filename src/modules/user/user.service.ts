import { Injectable } from '@nestjs/common'
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface'
import { User, Prisma } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { UserModel } from '@/models/user'
import { PrismaService } from '@/prisma'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    options: ClassTransformOptions = {},
  ): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
    return plainToClass(UserModel, user, options)
  }

  async getLikesByUser(slug: string): Promise<any[]> {
    const userId = await this.getUserIdBySlug(slug)
    if (!userId) return []
    return await this.prisma.article.findMany({
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
    return this.prisma.article.findMany({
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
      orderBy?: Prisma.UserOrderByInput
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
    const user = await this.prisma.user.create({
      data,
    })
    return plainToClass(UserModel, user)
  }

  async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
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
