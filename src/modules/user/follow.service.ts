import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma'

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  /**
   * 该用户关注的人
   */
  async getFollowers(userId?: number): Promise<any[]> {
    if (!userId) return []
    return this.prisma.user.findMany({
      where: { followers: { some: { followingId: userId } } },
    })
  }

  async hasFollow(userId: number, followingId: number): Promise<boolean> {
    const follower = await this.prisma.follower.findFirst({
      where: {
        followerId: userId,
        followingId,
      },
    })
    return !!follower
  }

  /**
   * 关注该用户的人
   */
  async getFollowings(userId?: number): Promise<any[]> {
    if (!userId) return []
    return await this.prisma.user.findMany({
      where: { followings: { some: { followerId: userId } } },
    })
  }
}
