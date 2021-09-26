import { Controller, Get, Inject, Param } from '@nestjs/common'
import { UserService } from './user.service'
import _ from 'lodash'
import { User } from '~/prisma/client'
import { FollowService } from './follow.service'
import { LikeService } from './like.service'
import { ContentApiPrefix } from '@/constants/constants'

@Controller(ContentApiPrefix)
export class UserApiController {
  @Inject(FollowService) private readonly follow: FollowService
  @Inject(UserService) private readonly service: UserService
  @Inject(LikeService) private readonly like: LikeService

  @Get('/users')
  async getUsers() {
    const users = await this.service.users()
    return users
  }

  @Get('/users/:slug')
  async getUserBySlug(@Param('slug') slug: string) {
    const user = await this.service.getUser({ slug })
    return _.omit<User>(user, ['password'])
  }

  @Get('/users/:slug/followers')
  async getUserFollowers(@Param('slug') slug: string) {
    const userId = await this.service.getUserIdBySlug(slug)
    return await this.follow.getFollowers(userId)
  }

  @Get('/users/:slug/followings')
  async getUserFollowings(@Param('slug') slug: string) {
    const userId = await this.service.getUserIdBySlug(slug)
    return await this.follow.getFollowings(userId)
  }

  @Get('/users/:slug/likes')
  async getUserLikes(@Param('slug') slug: string) {
    const userId = await this.service.getUserIdBySlug(slug)
    console.log(userId)
    if (!userId) return []
    return await this.like.posts(userId)
  }

  @Get('/users/:slug/favorites')
  async getUserFavorites(@Param('slug') slug: string) {
    return await this.service.getFavoritesByUser(slug)
  }
}
