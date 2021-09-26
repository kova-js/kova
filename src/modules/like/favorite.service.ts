import { Injectable } from '@nestjs/common'
import { User, Prisma } from '~/prisma/client'
import { PrismaService } from '@/prisma'

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

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
}
