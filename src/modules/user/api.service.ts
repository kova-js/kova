import { Inject, Injectable } from '@nestjs/common'
import { LikeService } from '../like'
import { FollowService } from './follow.service'
import { UserService } from './user.service'

@Injectable()
export class UserApiService {
  @Inject(FollowService) private readonly follow: FollowService
  @Inject(LikeService) private readonly like: LikeService
  @Inject(UserService) private readonly service: UserService

  async getUsers() {
    return await this.service.users()
  }

  async getUserBySlug(slug: string) {
    const user = await this.service.getUser({ slug })
    return user
  }

  async getUserFollowers(slug: string) {
    const userId = await this.service.getUserIdBySlug(slug)
    return await this.follow.getFollowers(userId)
  }

  async getUserFollowings(slug: string) {
    const userId = await this.service.getUserIdBySlug(slug)
    return await this.follow.getFollowings(userId)
  }

  async getUserLikes(slug: string) {
    const userId = await this.service.getUserIdBySlug(slug)
    if (!userId) return []
    return await this.like.articles(userId)
  }

  async getUserFavorites(slug: string) {
    return await this.service.getFavoritesByUser(slug)
  }
}
